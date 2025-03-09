import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useSignUp() {
  const router = useRouter();

  const signUpMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) =>
      await signUp(email, password),
    onSuccess: () => {
      router.push('/sign-in');
    },
  });

  return {
    signUp: signUpMutation.mutate,
    isLoading: signUpMutation.isPending,
    error: signUpMutation.error,
  };
}

async function signUp(email: string, password: string) {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || response.statusText);
  }

  return await response.json();
}
