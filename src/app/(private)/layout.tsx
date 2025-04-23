import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { routes } from '../routes/routes';
import { authOptions } from '@/lib/auth/authOptions';

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(routes.signIn);
  }
  return <>{children}</>;
}
