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
        console.log('existing user', existingUser);
        return {
          id: existingUser.id,
          email: existingUser.email,
          categories: existingUser.categories,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      console.log(token, user);
      if (user) {
        token.id = user.id;
        token.categories = user.categories;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.categories) {
        session.user.categories = token.categories;
      }
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          categories: token.categories,
        },
      };
    },
  },
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
