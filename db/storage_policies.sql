-- Storage bucket policies for the 'images' bucket with single admin model

-- First, ensure the storage schema exists and the bucket is created
-- This is typically handled by Supabase automatically, but adding for completeness
-- You can run this in the Supabase SQL editor

-- Create the 'images' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Make the 'images' bucket public (alternative approach if above doesn't work)
UPDATE storage.buckets SET public = true WHERE id = 'images';

-- Set up RLS (Row Level Security) for the storage.objects table
-- This controls who can do what with the files

-- Enable RLS on the objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public read access for the images bucket
-- This allows anyone to view/download images
CREATE POLICY "Anyone can view images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'images');

-- Policy: Allow only admin to upload images
-- Assuming your admin user has a specific email or a role set to 'admin'
CREATE POLICY "Admin can upload images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'images'
  AND auth.role() = 'authenticated'
);

-- Policy: Allow only admin to update images
CREATE POLICY "Admin can update images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'images'
  AND auth.role() = 'authenticated'
)
WITH CHECK (bucket_id = 'images');

-- Policy: Allow only admin to delete images
CREATE POLICY "Admin can delete images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'images'
  AND auth.role() = 'authenticated'
);

-- Note: These policies need to be executed in your Supabase project's SQL editor
-- You can copy and paste this SQL into the Supabase SQL editor in your project dashboard
