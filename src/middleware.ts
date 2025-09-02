import { getRequestClient } from './utils/supabase/getRequestClient';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const { supabase, response } = getRequestClient(request);

  // You can now use the `supabase` client to interact with your database
  // and the `response` object to modify the response as needed.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth') &&
    !request.nextUrl.pathname.startsWith('/error')
  ) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/dashboard'], // Adjust the paths as needed
};
