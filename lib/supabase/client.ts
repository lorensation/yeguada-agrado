import { createClient } from '@supabase/supabase-js';

// These environment variables should be set in your .env.local file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth functions
export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  try {
    // Clear the session in Supabase
    const { error } = await supabase.auth.signOut();
    
    // Also clear the cookie by calling our API endpoint
    await fetch('/api/auth/session/clear', {
      method: 'POST',
    });
    
    return { error };
  } catch (error) {
    console.error('Error signing out:', error);
    return { error };
  }
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return { user, error };
};

// Storage bucket name
export const IMAGES_BUCKET = 'images';

// Helpers for image management
export const uploadImage = async (
  file: File,
  path: string = ''
): Promise<{ url: string | null; error: Error | null }> => {
  try {
    const fileExt = file.name.split('.').pop();
    const filePath = `${path}${Date.now()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from(IMAGES_BUCKET)
      .upload(filePath, file);
    
    if (uploadError) {
      throw uploadError;
    }
    
    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from(IMAGES_BUCKET)
      .getPublicUrl(filePath);
    
    return { url: publicUrlData.publicUrl, error: null };
  } catch (error) {
    console.error('Error uploading image: ', error);
    return { url: null, error: error as Error };
  }
};

// Delete an image from the storage
export const deleteImage = async (url: string): Promise<{ success: boolean; error: Error | null }> => {
  try {
    // Extract the path from the URL
    const bucket = IMAGES_BUCKET;
    const urlObj = new URL(url);
    const pathMatch = urlObj.pathname.match(new RegExp(`/storage/v1/s3/${bucket}/(.*)`));
    
    if (!pathMatch || !pathMatch[1]) {
      throw new Error('Invalid image URL format');
    }
    
    const path = pathMatch[1];
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);
      
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting image: ', error);
    return { success: false, error: error as Error };
  }
};

// Article types
export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  published: boolean;
}

export interface ArticleInput {
  title: string;
  slug: string;
  summary: string;
  content: string;
  image_url: string;
  published?: boolean;
}

// Article CRUD operations
export const getArticles = async (
  limit: number = 10, 
  page: number = 0,
  published: boolean | null = true
): Promise<{ articles: Article[]; count: number; error: Error | null }> => {
  try {
    let query = supabase
      .from('articles')
      .select('*', { count: 'exact' });
    
    // Filter by published if specified
    if (published !== null) {
      query = query.eq('published', published);
    }
    
    // Pagination
    const from = page * limit;
    const to = from + limit - 1;
    
    const { data, error, count } = await query
      .order('created_at', { ascending: false })
      .range(from, to);
      
    if (error) throw error;
    
    return { 
      articles: data as Article[], 
      count: count || 0, 
      error: null 
    };
  } catch (error) {
    console.error('Error fetching articles: ', error);
    return { articles: [], count: 0, error: error as Error };
  }
};

export const getArticleBySlug = async (slug: string): Promise<{ article: Article | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single();
      
    if (error) throw error;
    
    return { article: data as Article, error: null };
  } catch (error) {
    console.error('Error fetching article: ', error);
    return { article: null, error: error as Error };
  }
};

export const getArticleById = async (id: string): Promise<{ article: Article | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    
    return { article: data as Article, error: null };
  } catch (error) {
    console.error('Error fetching article by ID: ', error);
    return { article: null, error: error as Error };
  }
};

export const createArticle = async (articleData: ArticleInput): Promise<{ article: Article | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .insert([articleData])
      .select()
      .single();
      
    if (error) throw error;
    
    return { article: data as Article, error: null };
  } catch (error) {
    console.error('Error creating article: ', error);
    return { article: null, error: error as Error };
  }
};

export const updateArticle = async (id: string, articleData: Partial<ArticleInput>): Promise<{ article: Article | null; error: Error | null }> => {
  try {
    const { data, error } = await supabase
      .from('articles')
      .update(articleData)
      .eq('id', id)
      .select()
      .single();
      
    if (error) throw error;
    
    return { article: data as Article, error: null };
  } catch (error) {
    console.error('Error updating article: ', error);
    return { article: null, error: error as Error };
  }
};

export const deleteArticle = async (id: string): Promise<{ success: boolean; error: Error | null }> => {
  try {
    const { error } = await supabase
      .from('articles')
      .delete()
      .eq('id', id);
      
    if (error) throw error;
    
    return { success: true, error: null };
  } catch (error) {
    console.error('Error deleting article: ', error);
    return { success: false, error: error as Error };
  }
};