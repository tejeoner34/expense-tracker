import { routes } from '@/app/routes/routes';
import SignInForm from '@/components/auth/SignInForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { authOptions } from '@/lib/auth/authOptions';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
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
        <p className="text-center text-sm text-gray-600 mt-2">
          If you don&apos;t have an account, please&nbsp;
          <Link className="text-blue-500 hover:underline" href={routes.signUp}>
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
