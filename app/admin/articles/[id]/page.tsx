"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Article, getArticleById } from "@/lib/supabase/client";
import ArticleEditor from "@/components/admin/article-editor";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

// Define proper type for params - now it's a promise that resolves to this type
interface PageParams {
  id: string;
}

// Component props with properly typed params
interface EditArticleProps {
  params: Promise<PageParams>;
}

export default function EditArticlePage({ params }: EditArticleProps) {
  // Unwrap params using React.use()
  const resolvedParams = React.use(params);
  const articleId = resolvedParams.id;
  
  const { loading: authLoading, isLoggedIn } = useAuth();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn && !authLoading) {
      router.push("/admin");
      return;
    }

    const fetchArticle = async () => {
      if (!articleId) return;

      try {
        const { article: fetchedArticle, error } = await getArticleById(articleId);
        
        if (error) throw error;
        if (!fetchedArticle) throw new Error("Artículo no encontrado");
        
        setArticle(fetchedArticle);
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("No se pudo cargar el artículo");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchArticle();
    }
  }, [articleId, isLoggedIn, authLoading, router]);

  if (authLoading || (isLoggedIn && loading)) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="space-y-3">
          <Skeleton className="h-8 w-[250px]" />
          <div className="mt-8">
            <Skeleton className="h-[600px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Will redirect in useEffect
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="mb-6 flex items-center gap-4">
          <Link href="/admin/articles">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4 text-primary" />
            </Button>
          </Link>
          <h1 className="text-3xl text-primary font-bold">Editar Artículo</h1>
        </div>
        
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
        
        <div className="mt-4">
          <Link href="/admin/articles">
            <Button variant="outline">Volver a la lista de artículos</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/articles">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4 text-primary" />
          </Button>
        </Link>
        <h1 className="text-3xl text-primary font-bold">
          Editar Artículo: {article?.title}
        </h1>
      </div>
      
      {article ? (
        <ArticleEditor article={article} />
      ) : (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      )}
    </div>
  );
}