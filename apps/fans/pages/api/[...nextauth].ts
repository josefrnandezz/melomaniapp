import {
  isAccessToken,
  isCredentials,
  isJwtPayload,
} from '@melomaniapp/contracts/auth';
import axios from 'axios';
import jose from 'jose';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import Providers from 'next-auth/providers';

const options: NextAuthOptions = {
  session: {
    jwt: true,
  },
  callbacks: {
    session: async (session, user) => {
      session.roles = user.roles;
      session.access_token = user.access_token;

      return session;
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.roles = profile.roles;
        token.access_token = profile.access_token;
      }
      return Promise.resolve(token);
    },
  },
  secret: process.env.NODE_JWT_SECRET || process.env.NX_JWT_SECRET,
  jwt: {
    secret: process.env.NODE_JWT_SECRET || process.env.NX_JWT_SECRET,
    encode: async ({ secret, token, maxAge }) => {
      const signingOptions: jose.JWT.SignOptions = {
        expiresIn: `${maxAge}s`,
        algorithm: 'HS512',
      };

      return jose.JWT.sign(token, secret, signingOptions);
    },
    // @ts-expect-error: Error in InitOptions declaration
    decode: async ({ secret, token, maxAge }) => {
      if (!token) return null;

      const verificationOptions = {
        maxTokenAge: `${maxAge}s`,
        algorithms: ['RS256', 'HS256', 'RS512', 'HS512'],
      };

      return jose.JWT.verify(token, secret, verificationOptions);
    },
  },
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
