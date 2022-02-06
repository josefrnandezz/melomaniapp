import jose from 'jose';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  jwt: {
    secret: process.env.JWT_SECRET,
    encode: async ({ secret, token, maxAge }) => {
      const signingOptions: jose.JWT.SignOptions = {
        expiresIn: `${maxAge}s`,
        algorithm: 'HS512',
      };

      return jose.JWT.sign(token as never, secret, signingOptions);
    },
    decode: async ({ secret, token, maxAge }) => {
      if (!token) {
        return null;
      }

      const verificationOptions = {
        maxTokenAge: `${maxAge}s`,
        algorithms: ['RS256', 'HS256', 'RS512', 'HS512'],
      };

      return jose.JWT.verify(token, secret, verificationOptions);
    },
  },
  callbacks: {
    session: async (session, user) => {
      const maxAge = 30 * 24 * 60 * 60;
      const secret = process.env.JWT_SECRET || 'changeme';
      const signingOptions: jose.JWT.SignOptions = {
        expiresIn: `${maxAge}s`,
        algorithm: 'HS512',
      };

      session.accessToken = jose.JWT.sign(user, secret, signingOptions);

      return session;
    },
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} as unknown as NextAuthOptions;

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
