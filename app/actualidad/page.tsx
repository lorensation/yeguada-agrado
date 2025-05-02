"use client"

import { useState, useEffect } from "react"
import { Suspense } from "react"
import PageHeader from "@/components/page-header"
import NewsCard from "@/components/news-card"
import { Button } from "@/components/ui/button"
import { getArticles } from "@/lib/supabase/client"
import { Article } from "@/lib/supabase/client"
 
function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const LIMIT = 9

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true)
      const { articles: fetchedArticles, count: totalCount, error } = await getArticles(LIMIT, page, true)
      
      if (error) {
        console.error("Error fetching articles:", error)
      } else {
        setArticles(prev => page === 0 ? fetchedArticles : [...prev, ...fetchedArticles])
        setCount(totalCount)
      }
      
      setLoading(false)
    }
    
    fetchArticles()
  }, [page])

  const handleLoadMore = () => {
    setPage(prev => prev + 1)
  }

  const handleCardClick = (slug: string) => {
    // Navigate to article detail page
    window.location.href = `/actualidad/${slug}`
  }

  if (loading && articles.length === 0) {
    return (
      <div className="py-20 text-center">
        <p>Cargando artículos...</p>
      </div>
    )
  }

  return (
    <>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <div 
            key={article.id} 
            onClick={() => handleCardClick(article.slug)}
            className="cursor-pointer transition-transform hover:scale-[1.02]"
          >
            <NewsCard
              title={article.title}
              date={article.created_at}
              summary={article.summary}
              image={article.image_url}
              slug={article.slug}
            />
          </div>
        ))}
      </div>
      
      {articles.length < count && (
        <div className="mt-10 text-center">
          <Button 
            onClick={handleLoadMore} 
            className="bg-primary hover:bg-primary/80 text-white py-2 px-8 text-lg"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Cargar más noticias"}
          </Button>
        </div>
      )}
    </>
  )
}

// Server Component
export default function ActualidadPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Actualidad" />
      
      <Suspense fallback={<div className="py-20 text-center">Cargando artículos...</div>}>
        <ArticlesList />
      </Suspense>
    </div>
  )
}
