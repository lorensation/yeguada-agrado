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

// API response structure from Twitter API v2
interface TwitterApiResponse {
  data: Tweet[]
  meta: {
    result_count: number
    newest_id: string
    oldest_id: string
  }
}

// Fallback tweets to use when API fails or no cache is available
const FALLBACK_TWEETS: Tweet[] = [
  {
    id: "1918249713180053616",
    text: `La ganadora del Gran Premio Villamejor 2015 🏆en @hipodromomadrid
      MUSIQUE SACRÉE (𝘿𝙊𝘾𝙏𝙊𝙍 𝘿𝙄𝙉𝙊) disfrutando con su potro por 𝘽𝙊𝙒 𝘾𝙍𝙀𝙀𝙆 de los prados de la yeguada

      MUSIQUE SACRÉE quedará vacía en 2025

      #YeguadaAgrado #BowCreek`,
    created_at: "2025-05-02T12:34:00.000Z",
    public_metrics: {
      retweet_count: 5,
      reply_count: 2,
      like_count: 24,
      quote_count: 1
    }
  },
  {
    id: "1917857647291773277",
    text: `✨ Espectacular foal hembra por 𝘽𝙊𝙒 𝘾𝙍𝙀𝙀𝙆 (𝙎𝙃𝘼𝙈𝘼𝙍𝘿𝘼𝙇) y MITRA (𝘾𝘼𝙍𝘼𝘿𝘼𝙆) con apenas un mes de vida

      La madre se encuentra ya preñada del campeón 𝙍𝙊𝘿𝘼𝘽𝘼𝙇𝙇𝙊 (𝙇𝙊𝙋𝙀 𝘿𝙀 𝙑𝙀𝙂𝘼)

      #YeguadaAgrado #BowCreek`,
    created_at: "2025-05-01T10:15:00.000Z",
    public_metrics: {
      retweet_count: 8,
      reply_count: 3,
      like_count: 32,
      quote_count: 2
    }
  },
  {
    id: "1917504280228921757",
    text: `Así lucen QUICK ARTIST (𝘿𝙐𝙏𝘾𝙃 𝘼𝙍𝙏) y su potro por 𝘽𝙊𝙒 𝘾𝙍𝙀𝙀𝙆 (𝙎𝙃𝘼𝙈𝘼𝙍𝘿𝘼𝙇) con casi dos meses de vida 🍀

      QUICK ARTIST quedará vacía esta temporada 2025

      #YeguadaAgrado #BowCreek`,
    created_at: "2025-04-30T15:20:00.000Z",
    public_metrics: {
      retweet_count: 6,
      reply_count: 2,
      like_count: 28,
      quote_count: 1
    }
  },
  {
    id: "1917136110167146899",
    text: `La ganadora de Gran Premio 🏆 LADY MOON (𝙇𝙄𝙂𝙃𝙏𝙉𝙄𝙉𝙂 𝙈𝙊𝙊𝙉) disfrutando en los prados de la yeguada junto a su potra por 𝘽𝙊𝙒 𝘾𝙍𝙀𝙀𝙆 ☀️

      La madre se encuentra preñada por segundo año consecutivo del hijo de 𝙎𝙃𝘼𝙈𝘼𝙍𝘿𝘼𝙇

      #YeguadaAgrado #BowCreek`,
    created_at: "2025-04-29T09:45:00.000Z",
    public_metrics: {
      retweet_count: 4,
      reply_count: 1,
      like_count: 19,
      quote_count: 0
    }
  },
  {
    id: "1914272552437850540",
    text: `Último nacimiento del año✨

      Por fin llegó el noveno y último nacimiento de la temporada en casa con este precioso macho de GALDANA (𝙍𝙄𝙋 𝙑𝘼𝙉 𝙒𝙄𝙉𝙆𝙀𝙇) por 𝙀𝙇𝙕𝘼𝘼𝙈

      GALDANA visitará esta temporada a 𝙍𝙊𝘿𝘼𝘽𝘼𝙇𝙇𝙊

      Enhorabuena a sus propietarios de Mediterráneo!`,
    created_at: "2025-04-27T14:30:00.000Z",
    public_metrics: {
      retweet_count: 7,
      reply_count: 3,
      like_count: 26,
      quote_count: 2
    }
  },
  {
    id: "1912086247746437243",
    text: `Octavo nacimiento del año✨

      Ayer STARLIGHT MYSTERY (𝙄𝙁𝙁𝙍𝘼𝘼𝙅) parió una preciosa hembra por 𝘽𝙊𝙒 𝘾𝙍𝙀𝙀𝙆 (𝙎𝙃𝘼𝙈𝘼𝙍𝘿𝘼𝙇),el sexto de la temporada en casa

      La madre será cubierta por el campeón 𝙍𝙊𝘿𝘼𝘽𝘼𝙇𝙇𝙊

      Enhorabuena a sus propietarios de la Cuadra Bolak!`,
    created_at: "2025-04-25T11:20:00.000Z",
    public_metrics: {
      retweet_count: 9,
      reply_count: 4,
      like_count: 35,
      quote_count: 2
    }
  }
];

interface XTweetCarouselProps {
  className?: string
}

export default function XTweetCarousel({ className }: XTweetCarouselProps) {
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPaused, setIsPaused] = useState(false)
  const [api, setApi] = useState<CarouselApi | undefined>()
  const [useFallback, setUseFallback] = useState(false)

  useEffect(() => {
    async function fetchTweets() {
      // Check if we have cached tweets in sessionStorage first
      const cachedTweets = sessionStorage.getItem('cachedTweets')
      //const cachedTimestamp = sessionStorage.getItem('cachedTweetsTimestamp')
      
      // If we have cached data and it's from the current page session
      if (cachedTweets && cachedTweets.length > 0) {
        try {
          const parsedTweets = JSON.parse(cachedTweets)
          if (Array.isArray(parsedTweets) && parsedTweets.length > 0) {
            setTweets(parsedTweets)
            setLoading(false)
            return
          }
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
          throw new Error(`Failed to fetch tweets: ${response.statusText}`)
        }
        
        const result = await response.json() as TwitterApiResponse
        
        // Check if the API returned the expected data structure
        if (result.data && Array.isArray(result.data) && result.data.length > 0) {
          // Save to state
          setTweets(result.data)
          
          // Save to session storage for future use
          try {
            sessionStorage.setItem('cachedTweets', JSON.stringify(result.data))
            sessionStorage.setItem('cachedTweetsTimestamp', new Date().toISOString())
          } catch (err: unknown) {
            console.warn('Failed to cache tweets data:', err)
            // Non-critical error, we can continue
          }
        } else if ('error' in result) {
          throw new Error(result.error as string)
        } else {
          throw new Error('Invalid tweet data format or empty response')
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar tweets'
        console.error('Error fetching tweets:', err)
        setError(errorMessage)
        // Use fallback tweets instead of showing an error
        setTweets(FALLBACK_TWEETS)
        setUseFallback(true)
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

  // If no tweets available either from API or cache, use fallback tweets
  useEffect(() => {
    if (!loading && tweets.length === 0) {
      setTweets(FALLBACK_TWEETS)
      setUseFallback(true)
    }
  }, [loading, tweets.length])

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
        {useFallback && (
          <div className="text-center mt-4 text-sm text-primary/70">
            <p>Mostrando tweets destacados</p>
          </div>
        )}
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
                                  {tweet.public_metrics.retweet_count + (tweet.public_metrics.quote_count || 0)}
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