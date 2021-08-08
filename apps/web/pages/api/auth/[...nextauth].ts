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
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Usuario', type: 'text' },
        password: { label: 'Contraseña', type: 'password' },
      },
      authorize: async (credentials): Promise<User> => {
        try {
          if (!isCredentials(credentials)) {
            console.error('next-auth - missing attributes in credentials');

            return Promise.resolve(null);
          }
          const res = await axios.post(
            `${
              process.env.NODE_API_URL_INTERNAL ||
              process.env.NX_API_URL_INTERNAL
            }/api/login`,
            credentials
          );

          if (!isAccessToken(res.data)) {
            console.error(
              'next-auth - missing attributes in response access token',
              JSON.stringify(res.data)
            );

            return Promise.resolve(null);
          }

          const verify = jwt.verify(
            res.data.access_token,
            process.env.NODE_JWT_SECRET || process.env.NX_JWT_SECRET
          );

          console.debug(verify);

          if (!isJwtPayload(verify)) {
            console.error(
              'next-auth - missing attributes in response payload',
              JSON.stringify(verify)
            );

            return Promise.resolve(null);
          }

          return Promise.resolve({
            name: verify.username,
            email: verify.username,
            roles: verify.roles,
            access_token: res.data.access_token,
          });
        } catch (e) {
          console.error('next-auth - error in credentials');
        }

        return Promise.resolve(null);
      },
    }),
  ],
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options);
