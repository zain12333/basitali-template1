import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import LoginForm from '@/components/admin/login-form';

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session) redirect('/admin/dashboard');
  return <LoginForm />;
}
