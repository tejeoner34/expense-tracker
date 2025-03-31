import { Currency } from '@/domain/models/expense.model';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export function useSignUp() {
  const router = useRouter();

  const signUpMutation = useMutation({
    mutationFn: async ({
      email,
      password,
      defaultCurrency,
    }: {
      email: string;
      password: string;
      defaultCurrency: Currency;
    }) => await signUp(email, password, defaultCurrency),
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

async function signUp(email: string, password: string, defaultCurrency: Currency) {
  const response = await fetch('/api/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, defaultCurrency }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || response.statusText);
  }

  return await response.json();
}
