// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    defaultCurrency: string;
  }

  interface Session {
    user: User & {
      id: string;
      defaultCurrency: string;
    };
  }
}
