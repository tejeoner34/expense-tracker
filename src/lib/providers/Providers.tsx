'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import ReactQueryProvider from './ReactQueryProvider';

type ProviderProps = {
  children: ReactNode;
};

function Providers({ children }: ProviderProps) {
  return (
    <SessionProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </SessionProvider>
  );
}

export default Providers;
