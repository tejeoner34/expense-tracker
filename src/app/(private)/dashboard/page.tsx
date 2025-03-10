import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { routes } from '@/app/routes/routes';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(routes.signIn);
  }
  return <div>DASHBOARD</div>;
};

export default DashboardPage;
