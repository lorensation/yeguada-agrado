"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Article, ArticleInput, createArticle, updateArticle, uploadImage } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { AlertCircle, Loader2, Plus } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// HTML templates for article content
const htmlTemplates = [
  {
    label: "Título (H1)",
    value: "<h1>Título principal</h1>",
    description: "Título principal del artículo"
  },
  {
    label: "Subtítulo (H2)",
    value: "<h2>Subtítulo</h2>",
    description: "Subtítulo para secciones importantes"
  },
  {
    label: "Encabezado pequeño (H3)",
    value: "<h3>Encabezado pequeño</h3>",
    description: "Encabezado para subsecciones"
  },
  {
    label: "Párrafo",
    value: "<p>Escribe tu texto aquí...</p>",
    description: "Bloque de texto normal"
  },
  {
    label: "Imagen",
    value: '<img src="URL_DE_LA_IMAGEN" alt="Descripción de la imagen" class="w-full h-auto my-4" />',
    description: "Inserta una imagen"
  },
  {
    label: "Lista con viñetas",
    value: "<ul>\n  <li>Elemento 1</li>\n  <li>Elemento 2</li>\n  <li>Elemento 3</li>\n</ul>",
    description: "Lista no ordenada con viñetas"
  },
  {
    label: "Lista numerada",
    value: "<ol>\n  <li>Paso 1</li>\n  <li>Paso 2</li>\n  <li>Paso 3</li>\n</ol>",
    description: "Lista ordenada con números"
  },
  {
    label: "Cita",
    value: "<blockquote>Texto de la cita...</blockquote>",
    description: "Bloque de cita"
  },
  {
    label: "Enlace",
    value: '<a href="https://enlace.com" target="_blank" rel="noopener noreferrer">Texto del enlace</a>',
    description: "Enlace a otra página web"
  },
  {
    label: "Texto en negrita",
    value: "<strong>Texto en negrita</strong>",
    description: "Texto con énfasis fuerte"
  },
  {
    label: "Texto en cursiva",
    value: "<em>Texto en cursiva</em>",
    description: "Texto con énfasis"
  },
  {
    label: "Divisor",
    value: "<hr />",
    description: "Línea horizontal divisoria"
  }
];

// Generate slug from title with max 30 characters
const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')  // Remove special chars
    .replace(/\s+/g, '-')      // Replace spaces with hyphens
    .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
    .slice(0, 50)              // Limit to 30 characters
    .replace(/-+$/, '');       // Remove trailing hyphens
};

interface ArticleEditorProps {
  article?: Article;
  onSuccess?: () => void;
}

export default function ArticleEditor({ article, onSuccess }: ArticleEditorProps) {
  const router = useRouter();
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState(article?.title || "");
  const [slug, setSlug] = useState(article?.slug || "");
  const [summary, setSummary] = useState(article?.summary || "");
  const [content, setContent] = useState(article?.content || "");
  const [imageUrl, setImageUrl] = useState(article?.image_url || "");
  const [published, setPublished] = useState(article?.published || false);
  
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(article?.image_url || null);

  // Auto-generate slug when title changes
  useEffect(() => {
    if (title) {
      setSlug(generateSlug(title));
    }
  }, [title, article]);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);
      
      // Create a preview URL for the image
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      fileReader.readAsDataURL(selectedFile);
    }
  };

  // Insert HTML template at cursor position in the content textarea
  const insertHtmlTemplate = (template: string) => {
    if (!contentTextareaRef.current) return;
    
    const textarea = contentTextareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // Combine existing content with the new template at the cursor position
    const newContent = 
      content.substring(0, start) + 
      template + 
      content.substring(end);
    
    setContent(newContent);
    
    // Focus back on textarea and place cursor after inserted template
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + template.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let finalImageUrl = imageUrl;

      // Upload image if a new one is selected
      if (image) {
        const { url, error: uploadError } = await uploadImage(image, "articles/");
        if (uploadError) throw uploadError;
        if (url) finalImageUrl = url;
      }

      // Validate required fields
      if (!title || !slug || !summary || !content || !finalImageUrl) {
        throw new Error("Todos los campos son obligatorios");
      }

      const articleData: ArticleInput = {
        title,
        slug,
        summary,
        content,
        image_url: finalImageUrl,
        published
      };

      setImageUrl(finalImageUrl);
      let result;
      if (article) {
        // Update existing article
        result = await updateArticle(article.id, articleData);
      } else {
        // Create new article
        result = await createArticle(articleData);
      }

      if (result.error) throw result.error;

      if (onSuccess) {
        onSuccess();
      } else {
        router.push(`/admin/articles`);
        router.refresh();
      }
    } catch (err) {
      console.error("Error saving article:", err);
      setError("Error al guardar el artículo. " + (err instanceof Error ? err.message : ""));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardContent className="pt-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Título del artículo"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug (URL)</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="url-del-articulo"
              disabled={loading}
              required
            />
            <p className="text-sm text-gray-500">
              URL amigable para el artículo. Se genera automáticamente a partir del título.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Resumen</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Breve resumen del artículo"
              className="min-h-20"
              disabled={loading}
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">Contenido</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Plus className="h-4 w-4" /> Insertar elemento HTML
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 max-h-80 overflow-y-auto">
                  {htmlTemplates.map((template, index) => (
                    <DropdownMenuItem
                      key={index}
                      onClick={() => insertHtmlTemplate(template.value)}
                    >
                      <div className="flex flex-col">
                        <span>{template.label}</span>
                        <span className="text-xs text-gray-500">{template.description}</span>
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Textarea
              id="content"
              ref={contentTextareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Contenido del artículo"
              className="min-h-[300px] font-mono"
              disabled={loading}
              required
            />
            <p className="text-sm text-gray-500">
              Utiliza el botón "Insertar elemento HTML" para añadir fácilmente elementos al contenido.
            </p>
          </div>

          <div className="space-y-4">
            <Label htmlFor="image">Imagen de portada</Label>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/2">
                <div className="border border-dashed border-gray-300 rounded-md p-4 flex flex-col gap-2">
                  <div className="flex items-center">
                    <label 
                      htmlFor="image" 
                      className="bg-[#0B0B45] text-white text-sm py-2 px-4 rounded cursor-pointer hover:bg-[#0B0B45]/90 transition-colors"
                    >
                      Seleccionar archivo
                    </label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      disabled={loading}
                      className="hidden"
                    />
                    <span className="ml-3 text-sm text-gray-500">
                      {image ? image.name : "Ningún archivo seleccionado"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Recomendado: 1200×630px
                  </p>
                </div>
              </div>
              
              <div className="relative w-full md:w-1/2 h-60 rounded-md overflow-hidden border">
                {previewUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={previewUrl}
                    alt="Vista previa"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                    Vista previa no disponible
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="published"
              checked={published}
              onCheckedChange={setPublished}
              disabled={loading}
            />
            <Label htmlFor="published">Publicar artículo</Label>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading} className="bg-primary text-white hover:bg-primary/80">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {article ? 'Actualizar artículo' : 'Crear artículo'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}