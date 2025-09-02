'use client';
import { Button } from './ui/button';
import Link from 'next/link';

type Props = {
  user: { email: string } | null;
};

export function AuthButton({ user }: Props) {
  if (user) {
    return (
      <>
        <Button asChild variant="default" className="mr-4">
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <form action="/auth/logout" method="POST" style={{ display: 'inline' }}>
          <Button type="submit" variant="outline" size="sm">
            Sign Out
          </Button>
        </form>
      </>
    );
  }

  return (
    <>
      <Button
        asChild
        variant="outline"
        size="sm"
        className="origin-center [&>a]:inline-block mr-2"
      >
        <Link href="/login">Sign In</Link>
      </Button>
      <Button
        asChild
        variant="default"
        size="sm"
        className="origin-center [&>a]:inline-block"
      >
        <Link href="/sign-up">Sign Up</Link>
      </Button>
    </>
  );
}
