"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Article, getArticles, deleteArticle, updateArticle } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Loader2, Plus, Pencil, Trash2, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { articles: fetchedArticles, error } = await getArticles(100, 0, null);
      if (error) throw error;
      setArticles(fetchedArticles);
    } catch (err) {
      console.error("Error fetching articles:", err);
      setError("Error al cargar los artículos");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (article: Article) => {
    setSelectedArticle(article);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedArticle) return;
    
    setDeleting(selectedArticle.id);
    try {
      const { success, error } = await deleteArticle(selectedArticle.id);
      if (error) throw error;
      if (success) {
        // Remove the deleted article from state
        setArticles(articles.filter(article => article.id !== selectedArticle.id));
      }
    } catch (err) {
      console.error("Error deleting article:", err);
      setError("Error al eliminar el artículo");
    } finally {
      setDeleting(null);
      setDeleteDialogOpen(false);
    }
  };

  const handleTogglePublished = async (article: Article) => {
    setActionLoading(article.id);
    try {
      const { error } = await updateArticle(article.id, { published: !article.published });
      if (error) throw error;
      
      // Update the article in the local state
      setArticles(articles.map(a => 
        a.id === article.id ? { ...a, published: !a.published } : a
      ));
    } catch (err) {
      console.error("Error updating article:", err);
      setError("Error al actualizar el estado de publicación");
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Gestión de Artículos</h2>
        <Link href="/admin/articles/new">
          <Button className="bg-primary hover:bg-primary/80">
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Artículo
          </Button>
        </Link>
      </div>

      {error && (
        <Card className="bg-red-50 p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </Card>
      )}

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Publicado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                    No hay artículos disponibles
                  </TableCell>
                </TableRow>
              ) : (
                articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium max-w-xs truncate">
                      {article.title}
                    </TableCell>
                    <TableCell>
                      {format(new Date(article.created_at), "d MMM yyyy", { locale: es })}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={article.published}
                        onCheckedChange={() => handleTogglePublished(article)}
                        disabled={actionLoading === article.id}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end items-center space-x-2">
                        {article.published && (
                          <Link href={`/actualidad/${article.slug}`} target="_blank">
                            <Button size="icon" variant="ghost">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </Link>
                        )}
                        <Link href={`/admin/articles/${article.id}`}>
                          <Button size="icon" variant="outline">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => handleDeleteClick(article)}
                          disabled={deleting === article.id}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          {deleting === article.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Trash2 className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="!text-primary font-bold">¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará permanentemente el artículo &quot;{selectedArticle?.title}&quot; y no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="!text-primary !border-primary hover:bg-primary/10">Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete} 
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
    </div>
  );
}