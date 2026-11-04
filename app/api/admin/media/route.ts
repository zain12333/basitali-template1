import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth';
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
const MAX_SIZE = 5 * 1024 * 1024;

const IMAGE_EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif']);
const VIDEO_EXTS = new Set(['.mp4', '.webm', '.mov']);
const MEDIA_EXTS = new Set([...IMAGE_EXTS, ...VIDEO_EXTS]);

function getMimeType(ext: string): string {
  const map: Record<string, string> = {
    '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
    '.webp': 'image/webp', '.svg': 'image/svg+xml', '.gif': 'image/gif',
    '.mp4': 'video/mp4', '.webm': 'video/webm', '.mov': 'video/quicktime',
  };
  return map[ext] || 'application/octet-stream';
}

function scanDir(dir: string, base: string): { filePath: string; relativePath: string }[] {
  const results: { filePath: string; relativePath: string }[] = [];
  let entries: fs.Dirent[];
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...scanDir(full, base));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (MEDIA_EXTS.has(ext)) {
        const rel = '/' + path.relative(base, full).replace(/\\/g, '/');
        results.push({ filePath: full, relativePath: rel });
      }
    }
  }
  return results;
}

export async function GET(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const usage = searchParams.get('usage');

  if (usage) {
    const { data: rows } = await getSupabaseAdmin()
      .from('site_content')
      .select('section, content');

    const usedBy: string[] = [];
    if (rows) {
      for (const row of rows) {
        const json = JSON.stringify(row.content || {});
        if (json.includes(usage)) {
          usedBy.push(row.section);
        }
      }
    }
    return NextResponse.json({ usedBy });
  }

  const source = searchParams.get('source') || 'local';
  const offset = parseInt(searchParams.get('offset') || '0');
  const search = (searchParams.get('search') || '').toLowerCase();

  if (source === 'uploaded') {
    const { data: files, error } = await getSupabaseAdmin()
      .storage.from('site-media')
      .list('', {
        limit: 60,
        offset,
        sortBy: { column: 'created_at', order: 'desc' },
        search: search || undefined,
      });

    if (error) {
      return NextResponse.json({ images: [], hasMore: false });
    }

    const images = (files || [])
      .filter((f) => f.name && !f.name.startsWith('.'))
      .map((f) => {
        const { data: urlData } = getSupabaseAdmin()
          .storage.from('site-media')
          .getPublicUrl(f.name);

        return {
          path: f.name,
          name: f.name,
          url: urlData.publicUrl,
          createdAt: f.created_at,
          size: f.metadata?.size,
          type: f.metadata?.mimetype,
          source: 'uploaded' as const,
        };
      });

    return NextResponse.json({
      images,
      hasMore: (files || []).length === 60,
    });
  }

  const publicDir = path.join(process.cwd(), 'public');
  const assetsDir = path.join(publicDir, 'assets');
  let allFiles = scanDir(assetsDir, publicDir);

  if (search) {
    allFiles = allFiles.filter((f) => f.relativePath.toLowerCase().includes(search));
  }

  allFiles.sort((a, b) => {
    const folderA = path.dirname(a.relativePath);
    const folderB = path.dirname(b.relativePath);
    if (folderA !== folderB) return folderA.localeCompare(folderB);
    return a.relativePath.localeCompare(b.relativePath);
  });

  const PAGE_SIZE = 60;
  const page = allFiles.slice(offset, offset + PAGE_SIZE);

  const images = page.map((f) => {
    const ext = path.extname(f.filePath).toLowerCase();
    let size = 0;
    try { size = fs.statSync(f.filePath).size; } catch { /* ignore */ }
    const folder = path.dirname(f.relativePath).replace(/^\/assets\/?/, '') || 'assets';

    return {
      path: f.relativePath,
      name: path.basename(f.filePath),
      url: f.relativePath,
      size,
      type: getMimeType(ext),
      source: 'local' as const,
      folder,
    };
  });

  return NextResponse.json({
    images,
    total: allFiles.length,
    hasMore: offset + PAGE_SIZE < allFiles.length,
  });
}

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
  }

  if (file.size === 0) {
    return NextResponse.json({ error: 'File is empty' }, { status: 400 });
  }

  if (file.type === 'image/svg+xml') {
    const text = await file.text();
    if (/<script/i.test(text) || /on\w+\s*=/i.test(text) || /javascript:/i.test(text)) {
      return NextResponse.json({ error: 'SVG contains unsafe content' }, { status: 400 });
    }
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const sanitized = file.name
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 60);
  const filename = `${sanitized}-${randomUUID().slice(0, 8)}.${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await getSupabaseAdmin()
    .storage.from('site-media')
    .upload(filename, buffer, {
      contentType: file.type,
      upsert: false,
      cacheControl: '31536000',
    });

  if (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }

  const { data: urlData } = getSupabaseAdmin()
    .storage.from('site-media')
    .getPublicUrl(filename);

  return NextResponse.json({ url: urlData.publicUrl, path: filename });
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { path: filePath } = body;
  if (!filePath || typeof filePath !== 'string') {
    return NextResponse.json({ error: 'Missing path' }, { status: 400 });
  }

  if (filePath.includes('..') || filePath.startsWith('/')) {
    return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin()
    .storage.from('site-media')
    .remove([filePath]);

  if (error) {
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
