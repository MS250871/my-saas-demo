import { type EmailOtpType } from '@supabase/supabase-js';
import { NextResponse, type NextRequest } from 'next/server';
import { getServerClient } from '@/utils/supabase/getServerClient';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  let next = '';

  if (token_hash && type) {
    const supabase = await getServerClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (type === 'email') {
      next = '/onboarding';
    }

    if (type === 'recovery') {
      next = '/change-password';
    }

    if (type === 'email_change') {
      next = '/change-email';
    }

    if (!error) {
      // redirect user to specified redirect URL or root of app
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // redirect the user to an error page with some instructions
  return NextResponse.redirect(new URL('/error', request.url));
}
