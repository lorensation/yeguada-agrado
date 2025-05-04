"use client"

import { useState, useEffect } from "react"
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'
import Image from "next/image"
import Link from "next/link"
import { Twitter, ArrowUpRight } from "lucide-react"
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"

// Tweet interface based on Twitter API v2
interface Tweet {
  id: string
  text: string
  created_at: string
  public_metrics?: {
    retweet_count: number
    reply_count: number
    like_count: number
    quote_count: number
  }
  entities?: {
    urls?: Array<{
      url: string
      expanded_url: string
      display_url: string
    }>
  }
}

interface XTweetCarouselProps {
  className?: string
}

export default function XTweetCarousel({ className }: XTweetCarouselProps) {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [api, setApi] = useState<CarouselApi | undefined>()

  useEffect(() => {
    async function fetchTweets() {
      // Check if we have cached tweets in sessionStorage first
      const cachedTweets = sessionStorage.getItem('cachedTweets')
      //const cachedTimestamp = sessionStorage.getItem('cachedTweetsTimestamp')
      
      // If we have cached data and it's from the current page session
      if (cachedTweets) {
        try {
          const parsedTweets = JSON.parse(cachedTweets)
          setTweets(parsedTweets)
          setLoading(false)
          return
        } catch (err) {
          console.error('Error parsing cached tweets:', err)
          // Continue to fetch if parsing fails
        }
      }

      // No valid cache, fetch from API
      try {
        setLoading(true)
        const response = await fetch('/api/tweets')
        
        if (!response.ok) {
          throw new Error('Failed to fetch tweets')
        }
        
        const data = await response.json()
        if (data.data && Array.isArray(data.data)) {
          // Save to state
          setTweets(data.data)
          
          // Save to session storage for future use
          try {
            sessionStorage.setItem('cachedTweets', JSON.stringify(data.data))
            sessionStorage.setItem('cachedTweetsTimestamp', new Date().toISOString())
          } catch (err: unknown) {
            console.warn('Failed to cache tweets data:', err)
            // Non-critical error, we can continue
          }
        } else {
          throw new Error('Invalid tweet data format')
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar tweets'
        console.error('Error fetching tweets:', err)
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }
    
    fetchTweets()
  }, []) // Empty dependency array means this effect runs once on mount

  // Format tweet text by handling links and mentions
  const formatTweetText = (tweet: Tweet) => {
    let text = tweet.text
    
    // Replace URLs with link placeholders
    if (tweet.entities?.urls && tweet.entities.urls.length > 0) {
      tweet.entities.urls.forEach(url => {
        // Remove the last URL that usually points to the tweet itself
        if (!url.expanded_url.includes('twitter.com') && !url.expanded_url.includes('x.com')) {
          text = text.replace(url.url, `[${url.display_url}](${url.expanded_url})`)
        } else {
          text = text.replace(url.url, '')
        }
      })
    }
    
    return text.trim()
  }

  // Setup auto-scrolling
  useEffect(() => {
    if (!api) return
    
    const autoplayInterval = setInterval(() => {
      if (!isPaused) {
        api.scrollNext()
      }
    }, 5000)
    
    return () => {
      clearInterval(autoplayInterval)
    }
  }, [api, isPaused])

  // Format relative time
  const formatTweetTime = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { 
      addSuffix: true,
      locale: es 
    })
  }

  return (
    <section className={`py-16 w-full overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <Twitter className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-bold text-primary hover:text-gold">
            Últimas Actualizaciones
          </h2>
        </div>
        <p className="text-contrast max-w-3xl mx-auto text-center">
          Síguenos en <Link href="https://x.com/YeguadaAgrado" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:text-gold inline-flex items-center">@YeguadaAgrado <ArrowUpRight className="w-4 h-4" /></Link> para estar al día de todas nuestras novedades.
        </p>
      </div>
      
      <div 
        className="w-full max-w-7xl mx-auto px-4" 
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">
            {error}
          </div>
        ) : tweets.length === 0 ? (
          <div className="text-center text-primary py-8">
            No hay tweets disponibles
          </div>
        ) : (
          <Carousel
            opts={{
              align: "start",
              loop: true,
              slidesToScroll: 1,
            }}
            className="w-full"
            setApi={setApi}
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {tweets.map((tweet) => (
                <CarouselItem 
                  key={tweet.id} 
                  className="pl-2 md:pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/3"
                >
                  <Link 
                    href={`https://x.com/YeguadaAgrado/status/${tweet.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Card className="bg-contrast/5 rounded-lg overflow-hidden h-full flex flex-col hover:shadow-lg transition-all">
                      <CardContent className="p-6 flex-1 flex flex-col">
                        <div className="flex items-center mb-4">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                            <Image 
                              src="/logo.jpg" 
                              alt="Yeguada Agrado" 
                              fill
                              className="object-cover" 
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-primary">Yeguada Agrado</p>
                            <p className="text-sm text-contrast">@YeguadaAgrado</p>
                          </div>
                        </div>
                        
                        <p className="text-primary mb-4">{formatTweetText(tweet)}</p>
                        
                        <div className="flex items-center justify-between mt-auto pt-3 text-sm text-contrast border-t border-contrast/10">
                          <span>{formatTweetTime(tweet.created_at)}</span>
                          <div className="flex items-center gap-4">
                            {tweet.public_metrics && (
                              <>
                                <span className="flex items-center gap-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                  </svg>
                                  {tweet.public_metrics.like_count}
                                </span>
                                <span className="flex items-center gap-1">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-repeat">
                                    <path d="m17 2 4 4-4 4" />
                                    <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
                                    <path d="m7 22-4-4 4-4" />
                                    <path d="M21 13v1a4 4 0 0 1-4 4H3" />
                                  </svg>
                                  {tweet.public_metrics.retweet_count + tweet.public_metrics.quote_count}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            {tweets.length > 3 && (
              <div className="flex justify-center gap-4 mt-8">
                <CarouselPrevious className="static translate-y-0 left-0 bg-contrast/10 hover:bg-contrast/20 text-primary border-primary" />
                <CarouselNext className="static translate-y-0 right-0 bg-contrast/10 hover:bg-contrast/20 text-primary border-primary" />
              </div>
            )}
          </Carousel>
        )}
      </div>
    </section>
  )
}