// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
    function middleware() {
        // Additional custom logic can be added here if needed
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                // Only allow access if a valid token exists
                return token !== null;
            }
        },
        pages: {
            signIn: '/auth/signin'
        }
    }
);

export const config = {
    matcher: ['/sdas/:path*']
};
