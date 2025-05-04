"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import ArticleList from "@/components/admin/article-list";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut } from "lucide-react";
import { signOut } from "@/lib/supabase/client";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export default function ArticlesPage() {
  const { user, loading, isLoggedIn, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    router.push("/admin");
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="space-y-3">
          <Skeleton className="h-8 w-[250px]" />
          <Skeleton className="h-4 w-[300px]" />
          <div className="mt-8">
            <Skeleton className="h-[400px] w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="alert alert-warning">
          <p className="text-center text-lg">
            Debes iniciar sesión para acceder a esta página.{" "}
            <Link href="/admin" className="underline font-medium">
              Ir a la página de acceso
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-10 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4 text-primary" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-primary mb-2">Gestión de Artículos</h1>
            <p className="text-muted-foreground">
              Administra los artículos de la sección de Actualidad
            </p>
          </div>
        </div>
        <Button variant="outline" onClick={handleLogout} className="text-primary">
          <LogOut className="mr-2 h-4 w-4 text-primary" /> 
          Cerrar sesión
        </Button>
      </div>
      
      <ArticleList />
    </div>
  );
}