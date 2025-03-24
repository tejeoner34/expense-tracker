import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    categories: string[];
  }

  interface Session {
    user: User & {
      id: string;
      categories: string[];
    };
  }
}
