import AdminShell from '@/components/admin/admin-shell';
import { InquiryProvider } from '@/lib/admin/inquiries';

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <InquiryProvider>
      <AdminShell>{children}</AdminShell>
    </InquiryProvider>
  );
}
