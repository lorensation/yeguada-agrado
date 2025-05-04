import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { notFound } from "next/navigation"
import { getArticleBySlug } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import React from "react"

// Define proper type for params - now it's a promise that resolves to this type
interface PageParams {
  slug: string;
}

// Component props with properly typed params
interface ArticleProps {
  params: Promise<PageParams>;
}

// Generate metadata for the page
export async function generateMetadata({ params }: ArticleProps): Promise<Metadata> {
  const { slug } = await params
  const { article } = await getArticleBySlug(slug)
  
  if (!article) {
    return {
      title: "Artículo no encontrado | Yeguada Agrado",
      description: "El artículo solicitado no se ha encontrado"
    }
  }
  
  return {
    title: `${article.title} | Yeguada Agrado`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      images: [article.image_url]
    }
  }
}

export default async function ArticlePage({ params }: ArticleProps) {
  const { slug } = await params
  const { article, error } = await getArticleBySlug(slug)
  
  if (error || !article) {
    notFound()
  }
  
  // Format the date
  const formattedDate = format(new Date(article.created_at), 
    "d 'de' MMMM 'de' yyyy", { locale: es })
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <Link href="/actualidad">
        <Button variant="outline" className="mb-6 text-primary">
          ← Volver a Actualidad
        </Button>
      </Link>
      
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
        {article.title}
      </h1>
      
      <div className="text-sm text-gray-500 mb-8">
        Publicado el {formattedDate}
      </div>
      
      <div className="relative w-full h-96 mb-8">
        <Image
          src={article.image_url}
          alt={article.title}
          fill
          className="object-cover rounded-lg"
          priority
        />
      </div>
      
      <div className="prose prose-lg max-w-none">
        <p className="text-xl font-medium text-primary">
          {article.summary}
        </p>
        
        <div 
          dangerouslySetInnerHTML={{ __html: article.content }}
          className="article-content text-primary mt-4"
        />
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200">
        <Link href="/actualidad">
          <Button variant="outline" className="text-primary">
            ← Volver a Actualidad
          </Button>
        </Link>
      </div>
    </div>
  )
}