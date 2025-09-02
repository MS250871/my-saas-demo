import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { getServerClient } from '@/utils/supabase/getServerClient';
import slugify from 'slugify';

const passwordRequirements = (val: string) =>
  val.length >= 8 &&
  /[a-z]/.test(val) &&
  /[A-Z]/.test(val) &&
  /[0-9]/.test(val) &&
  /[^A-Za-z0-9]/.test(val);

const schema = z
  .object({
    companyName: z
      .string()
      .min(
        2,
        'Company name should be more than 2 characters and less than 100 characters.'
      )
      .max(
        100,
        'Company name should be more than 2 characters and less than 100 characters.'
      ),
    email: z.email('Please enter a valid email.'),
    password: z
      .string()
      .refine(
        passwordRequirements,
        'Password must be at least 8 characters long and contain one lowercase, one uppercase, one number, and one special character.'
      ),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

type signUpFormData = z.infer<typeof schema>;

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const companyName = formData.get('companyName');
  const email = formData.get('email');
  const password = formData.get('password');
  const repeatPassword = formData.get('repeatPassword');

  if (
    typeof companyName !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof repeatPassword !== 'string'
  ) {
    const url = new URL('/sign-up', request.url);
    url.searchParams.set(
      'values',
      encodeURIComponent(JSON.stringify({ companyName, email }))
    );
    url.searchParams.set(
      'errors',
      encodeURIComponent(JSON.stringify({ form: 'Invalid form data' }))
    );
    return NextResponse.redirect(url);
  }

  const result = schema.safeParse({
    companyName,
    email,
    password,
    repeatPassword,
  });
  if (!result.success) {
    const errors: { [key: string]: string } = {};
    for (const issue of result.error.issues) {
      const key = (issue.path[0] as string) || 'form';
      if (!errors[key]) errors[key] = issue.message;
    }
    const url = new URL('/sign-up', request.url);
    url.searchParams.set('errors', encodeURIComponent(JSON.stringify(errors)));
    url.searchParams.set(
      'values',
      encodeURIComponent(JSON.stringify({ companyName, email }))
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
            'You are not allowed to sign up here. Please contact support. They will create an account for you and send you the details on your email.'
          ),
        request.url
      )
    );
  }

  const slug = slugify(data.companyName, { lower: true, strict: true });

  const supabase = await getServerClient();

  const { data: user, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        companyName: data.companyName,
        slug,
        role: 'owner',
      },
    },
  });

  if (error) {
    const url = new URL('/sign-up', request.url);
    url.searchParams.set(
      'values',
      encodeURIComponent(
        JSON.stringify({ companyName: data.companyName, email: data.email })
      )
    );
    url.searchParams.set(
      'errors',
      encodeURIComponent(JSON.stringify({ form: error.message }))
    );
    return NextResponse.redirect(url);
  }

  const { data: tenant, error: tenantError } = await supabase
    .from('tenants')
    .insert({
      owner_id: user.user?.id,
      company_name: user.user?.user_metadata?.companyName,
      slug: user.user?.user_metadata?.slug,
    });

  return NextResponse.redirect(
    new URL('/auth-message?type=signup', request.url)
  );
}
