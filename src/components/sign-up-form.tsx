'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useState } from 'react';

type Errors = Record<string, string | undefined>;
type Values = Record<string, string | undefined>;

export function SignUpForm({
  className,
  errors = {},
  values = {},
  ...props
}: React.ComponentProps<'form'> & { errors?: Errors; values?: Values }) {
  const [submitting, setSubmitting] = useState(false);
  return (
    <form
      method="POST"
      action="/auth/sign-up"
      className={cn('flex flex-col gap-6', className)}
      {...props}
      onSubmit={(e) => {
        setSubmitting(true);
      }}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to create your account
        </p>
      </div>
      {errors.form && (
        <div className="text-red-500 text-sm text-center bg-red-100 p-4 rounded-2xl border border-red-400">
          {errors.form}
        </div>
      )}
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            id="companyName"
            name="companyName"
            type="text"
            placeholder="Your Company Name"
            required
            defaultValue={values.companyName}
            aria-invalid={!!errors.companyName}
            aria-describedby={
              errors.companyName ? 'companyName-error' : undefined
            }
          />
          {errors.companyName && (
            <p id="companyName-error" className="text-red-500 text-xs">
              {errors.companyName}
            </p>
          )}
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
            required
            defaultValue={values.email}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-red-500 text-xs">
              {errors.email}
            </p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            required
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
          />
          {errors.password && (
            <p id="password-error" className="text-red-500 text-xs">
              {errors.password}
            </p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="repeatPassword">Repeat Password</Label>
          </div>
          <Input
            id="repeatPassword"
            name="repeatPassword"
            type="password"
            required
            aria-invalid={!!errors.repeatPassword}
            aria-describedby={
              errors.repeatPassword ? 'repeatPassword-error' : undefined
            }
          />
          {errors.repeatPassword && (
            <p id="repeatPassword-error" className="text-red-500 text-xs">
              {errors.repeatPassword}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? 'Signing Up...' : 'Sign Up'}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
              fill="currentColor"
            />
          </svg>
          Login with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{' '}
        <Link href="/login" className="underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </form>
  );
}
