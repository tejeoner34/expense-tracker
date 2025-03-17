import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { routes } from '@/app/routes/routes';
import SignInForm from '@/components/auth/SignInForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect(routes.dashboard);
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <SignInForm />
      </CardContent>
    </Card>
  );
}
