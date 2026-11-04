import type { Metadata } from 'next';
import SectionEditor from '@/components/admin/section-editor';

export const metadata: Metadata = { title: 'Settings' };

export default function SettingsPage() {
  return <SectionEditor slug="settings" />;
}
