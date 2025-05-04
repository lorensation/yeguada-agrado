"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import LoginForm from "@/components/admin/login-form";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "@/lib/supabase/client";

export default function AdminDashboard() {
  const { user, loading, isLoggedIn, setUser } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    router.refresh();
  };

  // Redirect to articles management page
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/admin/articles");
    }
  }, [isLoggedIn, router]);

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
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold mb-2">Administración de Yeguada Agrado</h1>
          <p className="text-muted-foreground">
            Inicia sesión para gestionar los contenidos del sitio web.
          </p>
        </div>
        
        <LoginForm />
      </div>
    );
  }

  // This won't typically render since we redirect to /admin/articles
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <div className="mb-10 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Panel de Administración</h1>
          <p className="text-muted-foreground">
            Bienvenido, {user?.email}
          </p>
        </div>
        <Button variant="outline" onClick={handleLogout} className="text-primary">
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </Button>
      </div>
      <div className="mb-10 text-center">
        <Link href="/admin/articles">
            <Button className="text-white hover:underline">
                Ir a la gestión de artículos
            </Button>
        </Link>
      </div>
    </div>
  );
}