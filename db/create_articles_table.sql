-- Create articles table for storing news content
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    published BOOLEAN DEFAULT FALSE,
    
    -- Add RLS (Row Level Security) policies
    CONSTRAINT proper_slug CHECK (slug ~* '^[a-z0-9]+(-[a-z0-9]+)*$')
);

-- Add indexes for better query performance
CREATE INDEX articles_slug_idx ON articles(slug);
CREATE INDEX articles_created_at_idx ON articles(created_at DESC);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policies for row security
-- Allow anyone to read published articles
CREATE POLICY "Anyone can read published articles" 
ON articles FOR SELECT 
USING (published = TRUE);

-- Only admin can insert/update/delete articles
CREATE POLICY "Admin can manage articles" 
ON articles FOR ALL 
USING (auth.jwt() ->> 'role' = 'admin');

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to call the function
CREATE TRIGGER update_articles_updated_at
BEFORE UPDATE ON articles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Comment on table and columns for better documentation
COMMENT ON TABLE articles IS 'Table for storing news articles for the actualidad page';
COMMENT ON COLUMN articles.id IS 'Unique identifier for the article';
COMMENT ON COLUMN articles.title IS 'Title of the article';
COMMENT ON COLUMN articles.slug IS 'URL-friendly version of the title for SEO purposes';
COMMENT ON COLUMN articles.summary IS 'Brief description or summary of the article content';
COMMENT ON COLUMN articles.content IS 'Full content of the article in HTML format';
COMMENT ON COLUMN articles.image_url IS 'URL to the main image stored in Supabase Storage';
COMMENT ON COLUMN articles.created_at IS 'Timestamp when the article was created';
COMMENT ON COLUMN articles.updated_at IS 'Timestamp when the article was last updated';
COMMENT ON COLUMN articles.published IS 'Boolean indicating if the article is published and visible to the public';
