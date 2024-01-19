import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
//Lz Teff

export default withAuth(
    function middleware(req) {
        console.log(req.nextUrl.pathname);
        console.log(req.nextauth.token.role);
        if (
            req.nextUrl.pathname.startsWith("/admin") &&
            req.nextauth.token.role != "admin"
        ) {
            return NextResponse.rewrite(new URL("/protected", req.url));
        }
    },

    {
        callbacks: {
            authorized({ req, token }) {
                if (token) return true;
            }
        },
        pages: {
            error: '/login',
        }
    }
);
export const config = { matcher: ["/admin/:path*"] }