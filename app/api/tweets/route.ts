import { NextResponse } from 'next/server';
import { createClient } from 'redis';
import fs from 'fs';
import path from 'path';

const TWITTER_USER_ID = '1593635811945242624'; // YeguadaAgrado Twitter/X user ID
const TWITTER_USERNAME = 'YeguadaAgrado'; // Twitter/X username
const CACHE_TIME = 3600; // Cache for 1 hour (in seconds)

// Use a local cache file for fallback when Redis is unavailable
const CACHE_FILE_PATH = path.join(process.cwd(), 'tweets-cache.json');

// Helper function to save cache to file (fallback method)
const saveCacheToFile = async (data: any) => {
  try {
    fs.writeFileSync(
      CACHE_FILE_PATH,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.error('Error saving tweet cache to file:', error);
  }
};

// Helper function to read cache from file (fallback method)
const readCacheFromFile = () => {
  try {
    if (fs.existsSync(CACHE_FILE_PATH)) {
      const fileContent = fs.readFileSync(CACHE_FILE_PATH, 'utf8');
      return JSON.parse(fileContent);
    }
  } catch (error) {
    console.error('Error reading tweet cache from file:', error);
  }
  return null;
};

// Create a Redis client
async function getRedisClient() {
  try {
    const client = createClient({
      url: process.env.REDIS_URL
    });
    
    await client.connect();
    return { client, connected: true };
  } catch (error) {
    console.error('Error connecting to Redis:', error);
    return { client: null, connected: false };
  }
}

export async function GET() {
  try {
    // Check if bearer token is available
    const bearerToken = process.env.X_BEARER_TOKEN;
    if (!bearerToken) {
      console.error('Missing X_BEARER_TOKEN environment variable');
      return NextResponse.json(
        { error: 'Twitter API token not configured' },
        { status: 500 }
      );
    }

    // Try to get cached data first
    let cachedData;
    let redisClient = null;
    let redisConnected = false;
    
    try {
      // Try Redis first
      const { client, connected } = await getRedisClient();
      redisClient = client;
      redisConnected = connected;
      
      if (connected && client) {
        const cachedJson = await client.get('twitter_timeline_cache');
        if (cachedJson) {
          cachedData = JSON.parse(cachedJson);
        }
      } else {
        // Fall back to file-based cache if Redis is unavailable
        cachedData = readCacheFromFile();
      }
      
      // If we have valid cached data that's not expired
      if (cachedData && 
          cachedData.timestamp && 
          (Date.now() - cachedData.timestamp) / 1000 < CACHE_TIME) {
        console.log('Serving tweets from cache');
        
        // Close Redis connection if it's open
        if (redisConnected && redisClient) {
          await redisClient.disconnect();
        }
        
        return NextResponse.json(cachedData.data);
      }
    } catch (error) {
      console.warn('Error accessing cache, will fetch fresh data:', error);
      // Continue to fetch fresh data
    }

    // First, find the user ID if we don't have it cached
    let userId = TWITTER_USER_ID;
    if (!userId) {
      try {
        const userResponse = await fetch(
          `https://api.twitter.com/2/users/by/username/${TWITTER_USERNAME}`,
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );

        if (!userResponse.ok) {
          // If we hit rate limit but have cached data, return the cached data even if expired
          if (userResponse.status === 429 && cachedData && cachedData.data) {
            console.log('Rate limited, serving expired cache');
            
            // Close Redis connection if it's open
            if (redisConnected && redisClient) {
              await redisClient.disconnect();
            }
            
            return NextResponse.json(cachedData.data);
          }
          throw new Error(`Failed to find X user: ${userResponse.statusText}`);
        }

        const userData = await userResponse.json();
        userId = userData.data.id;
      } catch (error) {
        console.error('Error finding Twitter user:', error);
        
        // If we have any cached data (even expired), return it instead of an error
        if (cachedData && cachedData.data) {
          console.log('Error fetching user, serving from cache');
          
          // Close Redis connection if it's open
          if (redisConnected && redisClient) {
            await redisClient.disconnect();
          }
          
          return NextResponse.json(cachedData.data);
        }
        
        return NextResponse.json(
          { error: 'Failed to find X user' },
          { status: 500 }
        );
      }
    }

    // Now fetch the user's tweets
    const response = await fetch(
      `https://api.twitter.com/2/users/${userId}/tweets?max_results=10&tweet.fields=created_at,public_metrics,entities&expansions=attachments.media_keys&media.fields=url,preview_image_url`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    // Handle rate limiting
    if (response.status === 429) {
      console.warn('Twitter API rate limit hit');
      
      // If we have any cached data (even expired), return it
      if (cachedData && cachedData.data) {
        console.log('Rate limited, serving from cache');
        
        // Close Redis connection if it's open
        if (redisConnected && redisClient) {
          await redisClient.disconnect();
        }
        
        return NextResponse.json(cachedData.data);
      }
      
      return NextResponse.json(
        { 
          error: 'Twitter API rate limit exceeded. Please try again later.',
          retryAfter: response.headers.get('x-rate-limit-reset') || '60'
        },
        { status: 429 }
      );
    }

    if (!response.ok) {
      // For other errors, also try to use cache if available
      if (cachedData && cachedData.data) {
        console.log(`Error ${response.status}, serving from cache`);
        
        // Close Redis connection if it's open
        if (redisConnected && redisClient) {
          await redisClient.disconnect();
        }
        
        return NextResponse.json(cachedData.data);
      }
      
      throw new Error(`Twitter API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Cache the successful response
    try {
      const cacheObject = {
        data,
        timestamp: Date.now(),
      };
      
      // Try Redis first
      if (redisConnected && redisClient) {
        await redisClient.set('twitter_timeline_cache', JSON.stringify(cacheObject), {
          EX: CACHE_TIME
        });
        
        // Close Redis connection
        await redisClient.disconnect();
      } else {
        // Fall back to file-based cache if Redis is unavailable
        await saveCacheToFile(data);
      }
    } catch (cacheError) {
      console.warn('Failed to cache tweets data:', cacheError);
      // Non-critical error, we can continue
      
      // Attempt to close Redis connection if there was an error
      if (redisConnected && redisClient) {
        try {
          await redisClient.disconnect();
        } catch (disconnectError) {
          console.error('Error disconnecting from Redis:', disconnectError);
        }
      }
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching tweets:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch tweets' },
      { status: 500 }
    );
  }
}