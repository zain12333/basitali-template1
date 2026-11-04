-- ============================================================
-- Basit Ali Admin Panel — Supabase Database Setup
-- Run this ENTIRE script in the Supabase SQL Editor
-- ============================================================

-- Table 1: Admin users
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

-- Table 2: Site content (CMS)
CREATE TABLE IF NOT EXISTS site_content (
  section TEXT PRIMARY KEY,
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by TEXT
);

-- Table 3: Contact inquiries
CREATE TABLE IF NOT EXISTS site_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT,
  services TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  received_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts on site_inquiries (for public contact form)
CREATE POLICY "Allow anonymous insert" ON site_inquiries
  FOR INSERT TO anon
  WITH CHECK (true);

-- Enable Realtime on site_inquiries
ALTER PUBLICATION supabase_realtime ADD TABLE site_inquiries;

-- ============================================================
-- Storage: Create the "site-media" bucket
-- Do this in the Supabase Dashboard → Storage → New Bucket:
--   Name: site-media
--   Public: ON
--   Allowed MIME types: image/jpeg, image/png, image/webp, image/svg+xml
--   File size limit: 5242880 (5MB)
-- Then add a SELECT policy allowing anon and authenticated to read.
-- ============================================================
