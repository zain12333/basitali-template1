import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { getSession } from '@/lib/auth';
import { getSection } from '@/lib/admin/sections';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { section: slug } = await params;
  const sectionDef = getSection(slug);
  if (!sectionDef) {
    return NextResponse.json({ error: 'Section not found' }, { status: 404 });
  }

  const { data, error } = await getSupabaseAdmin()
    .from('site_content')
    .select('content, updated_at')
    .eq('section', slug)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  const values = { ...sectionDef.defaults, ...(data?.content || {}) };

  return NextResponse.json({
    values,
    updatedAt: data?.updated_at || null,
  });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { section: slug } = await params;
  const sectionDef = getSection(slug);
  if (!sectionDef) {
    return NextResponse.json({ error: 'Section not found' }, { status: 404 });
  }

  const contentLength = request.headers.get('content-length');
  if (contentLength && parseInt(contentLength) > 1_000_000) {
    return NextResponse.json({ error: 'Content too large' }, { status: 413 });
  }

  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { values } = body;
  if (!values || typeof values !== 'object') {
    return NextResponse.json({ error: 'Missing values' }, { status: 400 });
  }

  const { error } = await getSupabaseAdmin()
    .from('site_content')
    .upsert(
      {
        section: slug,
        content: values,
        updated_at: new Date().toISOString(),
        updated_by: session.sub as string,
      },
      { onConflict: 'section' }
    );

  if (error) {
    console.error('Content save error:', error);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  const merged = { ...sectionDef.defaults, ...values };

  return NextResponse.json({ values: merged });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ section: string }> }
) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { section: slug } = await params;
  const sectionDef = getSection(slug);
  if (!sectionDef) {
    return NextResponse.json({ error: 'Section not found' }, { status: 404 });
  }

  await getSupabaseAdmin()
    .from('site_content')
    .delete()
    .eq('section', slug);

  return NextResponse.json({ values: sectionDef.defaults });
}
