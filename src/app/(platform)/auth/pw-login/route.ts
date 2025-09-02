import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { getServerClient } from '@/utils/supabase/getServerClient';

const schema = z.object({
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

type signUpFormData = z.infer<typeof schema>;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || typeof password !== 'string') {
    const url = new URL('/login', request.url);
    url.searchParams.set(
      'values',
      encodeURIComponent(JSON.stringify({ email }))
    );
    url.searchParams.set(
      'errors',
      encodeURIComponent(JSON.stringify({ form: 'Invalid form data' }))
    );
    return NextResponse.redirect(url);
  }

  const result = schema.safeParse({ email, password });
  if (!result.success) {
    const url = new URL('/login', request.url);
    url.searchParams.set(
      'values',
      encodeURIComponent(JSON.stringify({ email }))
    );
    url.searchParams.set(
      'errors',
      encodeURIComponent(JSON.stringify({ form: 'Invalid form data' }))
    );
    return NextResponse.redirect(url);
  }

  const data: signUpFormData = result.data;

  const [, emailHost] = data.email.split('@');

  if (emailHost === 'mysaas.com') {
    return NextResponse.redirect(
      new URL(
        '/error?error=' +
          encodeURIComponent(
            'You are not allowed to login here. Please contact support.'
          ),
        request.url
      )
    );
  }

  const supabase = await getServerClient();

  const { data: user, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    const url = new URL('/login', request.url);
    url.searchParams.set(
      'values',
      encodeURIComponent(JSON.stringify({ email: data.email }))
    );
    url.searchParams.set(
      'errors',
      encodeURIComponent(JSON.stringify({ form: error.message }))
    );
    return NextResponse.redirect(url);
  }

  return NextResponse.redirect(new URL('/dashboard', request.url));
}
