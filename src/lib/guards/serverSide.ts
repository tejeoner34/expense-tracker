import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { routes } from '@/app/routes/routes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const serverSideGuard = async () => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect(routes.signIn);
  }

  return session;
};
