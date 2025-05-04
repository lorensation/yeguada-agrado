import { NextResponse } from "next/server";

// X API endpoint for fetching tweets
const X_API_URL = "https://api.twitter.com/2/users/by/username/YeguadaAgrado";
const TWEETS_ENDPOINT = "https://api.twitter.com/2/users/{id}/tweets";

// Environment variables should be set in your .env.local file
const X_BEARER_TOKEN = process.env.X_BEARER_TOKEN;

// Function to get user ID by username
async function getUserByUsername(username: string): Promise<string | null> {
  try {
    const response = await fetch(`${X_API_URL}`, {
      headers: {
        Authorization: `Bearer ${X_BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data?.id || null;
  } catch (error) {
    console.error("Error fetching X user:", error);
    return null;
  }
}

// Function to get tweets by user ID
async function getTweetsByUserId(userId: string, count = 10): Promise<any> {
  try {
    const url = TWEETS_ENDPOINT.replace("{id}", userId);
    const params = new URLSearchParams({
      max_results: count.toString(),
      "tweet.fields": "created_at,public_metrics,entities,attachments",
      "media.fields": "url,preview_image_url",
      expansions: "attachments.media_keys,author_id",
    });

    const response = await fetch(`${url}?${params.toString()}`, {
      headers: {
        Authorization: `Bearer ${X_BEARER_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch tweets: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching tweets:", error);
    return { data: [] };
  }
}

export async function GET() {
  try {
    // Check if bearer token is available
    if (!X_BEARER_TOKEN) {
      return NextResponse.json(
        { error: "X API bearer token is not configured" },
        { status: 500 }
      );
    }

    // Get user ID for YeguadaAgrado
    const userId = await getUserByUsername("YeguadaAgrado");
    
    if (!userId) {
      return NextResponse.json(
        { error: "Failed to find X user" },
        { status: 404 }
      );
    }

    // Get tweets for the user
    const tweets = await getTweetsByUserId(userId);

    // Return the tweets
    return NextResponse.json(tweets);
  } catch (error: any) {
    console.error("Error in tweets API route:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch tweets" },
      { status: 500 }
    );
  }
}