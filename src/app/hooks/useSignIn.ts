import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { routes } from '../routes/routes';

export function useSignIn() {
  const router = useRouter();
  const signInMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
    },
    onSuccess: (data) => {
      if (!data?.ok) {
        throw new Error(data?.error || 'Invalid login');
      }
      router.push(routes.dashboard);
    },
    onError: (error) => {
      console.log('error', error);
    },
  });
  return {
    signIn: signInMutation.mutate,
    isLoading: signInMutation.isPending,
    error: signInMutation.error,
  };
}
