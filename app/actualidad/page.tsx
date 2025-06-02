"use client";

import { useState, useEffect } from "react";
import { Suspense } from "react";
import PageHeader from "@/components/page-header";
import NewsCard from "@/components/news-card";
import { Button } from "@/components/ui/button";
import { getArticles } from "@/lib/supabase/client";
import { Article } from "@/lib/supabase/client";

function ArticlesList() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const LIMIT = 9;

  // ─── localStorage KEYS ───────────────────────────────────────────────────────
  const LOCAL_STORAGE_KEY = "cachedActualidadArticles";
  const LOCAL_STORAGE_COUNT_KEY = "cachedActualidadCount";

  // ─── Helpers to read/write from localStorage ─────────────────────────────────
  const loadCachedArticles = (): Article[] => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (e) {
      console.warn("Failed to parse cached articles:", e);
      return [];
    }
  };

  const saveCachedArticles = (arr: Article[]) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(arr));
    } catch (e) {
      console.warn("Failed to save articles to localStorage:", e);
    }
  };

  const loadCachedCount = (): number => {
    if (typeof window === "undefined") return 0;
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_COUNT_KEY);
      if (!raw) return 0;
      const parsed = JSON.parse(raw);
      if (typeof parsed === "number") {
        return parsed;
      }
      return 0;
    } catch (e) {
      console.warn("Failed to parse cached count:", e);
      return 0;
    }
  };

  const saveCachedCount = (n: number) => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(LOCAL_STORAGE_COUNT_KEY, JSON.stringify(n));
    } catch (e) {
      console.warn("Failed to save count to localStorage:", e);
    }
  };

  // ─── On mount: load from cache, then fetch page 0 ────────────────────────────
  useEffect(() => {
    // 1) First, load whatever is in localStorage
    const cached = loadCachedArticles();
    const cachedCnt = loadCachedCount();
    if (cached.length > 0) {
      setArticles(cached);
    }
    if (cachedCnt > 0) {
      setCount(cachedCnt);
    }

    // 2) Immediately try to fetch fresh page 0
    (async () => {
      setLoading(true);
      try {
        const { articles: freshArticles, count: totalCount, error } = await getArticles(
          LIMIT,
          0,
          true
        );

        if (error) {
          throw error;
        }

        if (Array.isArray(freshArticles)) {
          setArticles(freshArticles);
          setCount(totalCount);
          saveCachedArticles(freshArticles);
          saveCachedCount(totalCount);
          setPage(0);
        }
      } catch (fetchErr) {
        console.warn("Could not fetch page 0 from Supabase:", fetchErr);
        // We leave `articles` and `count` as whatever was cached.
      } finally {
        setLoading(false);
      }
    })();
  }, []); // ← run once on mount

  // ─── Load more handler ───────────────────────────────────────────────────────
  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setLoading(true);

    try {
      const { articles: moreArticles, count: totalCount, error } = await getArticles(
        LIMIT,
        nextPage,
        true
      );

      if (error) {
        throw error;
      }

      if (Array.isArray(moreArticles) && moreArticles.length > 0) {
        const updated = [...articles, ...moreArticles];
        setArticles(updated);
        setCount(totalCount);
        setPage(nextPage);

        // Update the cache with the *full* array
        saveCachedArticles(updated);
        saveCachedCount(totalCount);
      }
    } catch (fetchErr) {
      console.warn(`Could not fetch page ${nextPage} from Supabase:`, fetchErr);
      alert("No se pudieron cargar más artículos en este momento.");
      // We do NOT bump `page`; user can try again later
    } finally {
      setLoading(false);
    }
  };

  // ─── Navigate to detail page ─────────────────────────────────────────────────
  const handleCardClick = (slug: string) => {
    window.location.href = `/actualidad/${slug}`;
  };

  // ─── Render ──────────────────────────────────────────────────────────────────
  // If we're still loading *and* there are no articles yet, show a full spinner message:
  if (loading && articles.length === 0) {
    return (
      <div className="py-20 text-center">
        <p>Cargando artículos…</p>
      </div>
    );
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

        {/** If we have absolutely no articles (cache was empty + fetch failed), show placeholder */}
        {!loading && articles.length === 0 && (
          <p className="col-span-full text-center text-red-500">
            No hay artículos disponibles en este momento.
          </p>
        )}
      </div>

      {/** “Cargar más noticias” solo si aún no hemos llegado al total */}
      {articles.length < count && (
        <div className="mt-10 text-center">
          <Button
            onClick={handleLoadMore}
            className="bg-primary hover:bg-primary/80 text-white py-2 px-8 text-lg"
            disabled={loading}
          >
            {loading ? "Cargando…" : "Cargar más noticias"}
          </Button>
        </div>
      )}
    </>
  );
}

// ─── Server Component wrapping the client ArticlesList ───────────────────────
export default function ActualidadPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <PageHeader title="Actualidad" />

      <Suspense fallback={<div className="py-20 text-center">Cargando artículos…</div>}>
        <ArticlesList />
      </Suspense>
    </div>
  );
}
