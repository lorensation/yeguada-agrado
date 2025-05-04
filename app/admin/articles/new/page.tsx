"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import ArticleEditor from "@/components/admin/article-editor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function NewArticlePage() {
  const { loading, isLoggedIn } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="space-y-3">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[300px]" />
          <div className="mt-8">
            <Skeleton className="h-[600px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    router.push("/admin");
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/articles">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4 text-primary" />
          </Button>
        </Link>
        <h1 className="text-3xl text-primary font-bold">Nuevo Artículo</h1>
      </div>
      
      <ArticleEditor />
    </div>
  );
}