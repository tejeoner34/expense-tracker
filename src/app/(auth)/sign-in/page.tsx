import SignInForm from '@/components/auth/SignInForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignInPage() {
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
