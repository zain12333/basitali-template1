import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';
import { SECTIONS } from '@/lib/admin/sections';

export async function GET() {
  const { data, error } = await getSupabaseAdmin()
    .from('site_content')
    .select('section, content, updated_at');

  if (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }

  const contentMap: Record<string, any> = {};

  for (const section of SECTIONS) {
    const saved = data?.find((r) => r.section === section.slug);
    contentMap[section.slug] = {
      ...section.defaults,
      ...(saved?.content || {}),
    };
  }

  return NextResponse.json(contentMap, {
    headers: { 'Cache-Control': 'no-store' },
  });
}
