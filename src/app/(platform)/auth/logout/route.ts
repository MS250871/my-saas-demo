import { NextResponse } from 'next/server';
import { getServerClient } from '@/utils/supabase/getServerClient';

export async function POST(request: Request) {
  const supabase = await getServerClient();
  await supabase.auth.signOut();
  return NextResponse.redirect(new URL('/', request.url));
}
