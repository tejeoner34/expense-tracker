import NextAuth, { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import CredentialsProvider from 'next-auth/providers/credentials';
import { routes } from '@/app/routes/routes';
import { db } from '@/lib/db';
import { compare } from 'bcrypt';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(db),
  pages: {
    signIn: routes.signIn,
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.password || !credentials?.email) {
          return null;
        }

        const existingUser = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!existingUser) {
          return null;
        }

        const passwordsMatch = await compare(credentials.password, existingUser.password);

        if (!passwordsMatch) {
          return null;
        }
        return {
          id: existingUser.id,
          email: existingUser.email,
          defaultCurrency: existingUser.defaultCurrency,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.defaultCurrency = user.defaultCurrency;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.categories) {
        session.user.defaultCurrency = token.defaultCurrency;
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          defaultCurrency: token.defaultCurrency,
        },
      };
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
