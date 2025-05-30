import { routes } from '@/app/routes/routes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../auth/authOptions';

export const serverSideGuard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(routes.signIn);
  }

  return session;
};
