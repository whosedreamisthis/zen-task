import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
	// If they hit the homepage, send them to /list
	if (request.nextUrl.pathname === '/') {
		return NextResponse.redirect(new URL('/list', request.url));
	}
}

export const config = {
	matcher: '/',
};
