'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import { routes } from '@/app/routes/routes';
import { signOut, useSession } from 'next-auth/react';

export function AuthButton() {
  const { data: session } = useSession();

  const router = useRouter();

  return session ? (
    <Button variant="destructive" onClick={() => signOut()}>
      Sign out
    </Button>
  ) : (
    <Button
      onClick={() => {
        router.push(routes.signIn);
      }}
    >
      Sign in
    </Button>
  );
}
