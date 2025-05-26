// app/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Extend the default session types
declare module 'next-auth' {
    interface Session {
        user: {
            id: string
        } & DefaultSession['user']
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Ensure credentials are not undefined and have expected properties
                if (!credentials?.username || !credentials?.password) {
                    console.error('Missing credentials');
                    return null;
                }

                // Hardcoded credentials for now
                if (
                    credentials.username === 'admin' && 
                    credentials.password === '123a@'
                ) {
                    return { 
                        id: '1', 
                        name: 'Admin User',
                        email: 'admin@example.com'
                    };
                }
                console.error('Invalid credentials');
                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin',
        error: '/auth/signin', // Redirect to signin page on error
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            // Ensure redirect goes to admin page after successful login
            return url.startsWith('/') ? `${baseUrl}${url}` : baseUrl;
        },
        async session({ session, token }) {
            // Add user ID to session
            session.user.id = token.id as string;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        }
    },
    debug: true // Enable debug logging
});
