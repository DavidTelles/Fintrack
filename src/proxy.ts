import { jwtVerify } from "jose";
import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

const publicRoutes = [
    { path: '/', whenAuthenticated: 'next' },
    { path: '/login', whenAuthenticated: 'redirect'},
    { path: '/register', whenAuthenticated: 'redirect'},
] as const

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/register';

export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname
    const publicRoute = publicRoutes.find(route => route.path == path)
    const token = request.cookies.get('token')?.value;

    let isAuthenticated = false;

    if(token) {
        try {
            const secretKey = new TextEncoder().encode(process.env.JWT_SECRET)
            await jwtVerify(token, secretKey)
            isAuthenticated = true
        } catch {
            isAuthenticated = false
        }
    }

    if (publicRoute && !isAuthenticated) {
        return NextResponse.next()
    };

    if (!publicRoute && !isAuthenticated) {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

        return NextResponse.redirect(redirectUrl);
    };

    if(publicRoute && isAuthenticated && publicRoute.whenAuthenticated == 'redirect') {
        const redirectUrl = request.nextUrl.clone()
        redirectUrl.pathname = '/dashboard';

        return NextResponse.redirect(redirectUrl);
    };

    if (!publicRoute && isAuthenticated) {
        return NextResponse.next()
    };

    return NextResponse.next()
}

export const config: MiddlewareConfig = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};