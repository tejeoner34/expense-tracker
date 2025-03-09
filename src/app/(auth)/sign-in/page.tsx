import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SignUpForm from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <SignUpForm />

        {/* {state?.error && <p className="text-red-500 text-sm mt-2">{state?.error}</p>} */}
      </CardContent>
    </Card>
  );
}
