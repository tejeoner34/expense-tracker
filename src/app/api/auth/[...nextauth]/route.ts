import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth/authOptions';

const handler = NextAuth(authOptions);

// Export the handler functions for Next.js API routes
export { handler as GET, handler as POST };
