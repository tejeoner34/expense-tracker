import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignUpForm from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <SignUpForm />
      </CardContent>
    </Card>
  );
}
