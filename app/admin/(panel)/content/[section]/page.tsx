import type { Metadata } from 'next';
import { getSection } from '@/lib/admin/sections';
import SectionEditor from '@/components/admin/section-editor';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ section: string }>;
}): Promise<Metadata> {
  const { section } = await params;
  const def = getSection(section);
  return { title: def?.title ?? section };
}

export default async function ContentSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const def = getSection(section);
  if (!def) notFound();
  return <SectionEditor slug={section} />;
}
