import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignUpForm from '@/components/auth/SignUpForm';

export default function SignInPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">{/* <SignUpForm /> */}</CardContent>
    </Card>
  );
}
