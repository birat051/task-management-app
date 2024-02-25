import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import {pool} from '../../../../serverdb/db'
import bcrypt from 'bcrypt';
import NextAuth from "next-auth/next";

const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session }) => ({
      ...session,
      user: {
        ...session.user,
      },
    }),
  },
  providers: [
    CredentialsProvider({
      name: 'Task Management',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "abc@taskmanagement.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const client = await pool.connect();
        if (!credentials) {
          return null; // Handle the case where credentials are undefined
        }
        try {
          const result = await client.query('SELECT * FROM users WHERE email_address = $1', [credentials.email]);
          const user = result.rows[0];
          const passwordMatch = await bcrypt.compare(credentials.password, user.password);
          if (!passwordMatch) {
            return null; 
          }
          return user;
        } catch (error) {
          console.error('Error during authorization:', error);
          return null;
        }
        finally{
          client.release()
        }
      }
    })
  ],
  pages: {
    signIn: '/signin'
  },
  secret: process.env.NEXT_AUTH_SECRET
};

const handler = NextAuth(authOptions)


export {handler as GET,handler as POST}