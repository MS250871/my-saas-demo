import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

type AuthMessagePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AuthSuccessPage({
  searchParams,
}: AuthMessagePageProps) {
  const resolvedSearchParams = await searchParams;
  const authType = resolvedSearchParams?.type;

  const title =
    authType === 'signup'
      ? 'Thank you for signing up!'
      : authType === 'magic-login'
      ? 'Magic link login request received!'
      : authType === 'reset-password'
      ? 'Password reset request received!'
      : 'Authentication request received!';

  const description =
    authType === 'signup'
      ? 'Check your email to confirm your account.'
      : authType === 'magic-login'
      ? 'Check your email for the magic login link.'
      : authType === 'reset-password'
      ? 'Check your email for the password reset link.'
      : 'Check your email for more information.';

  const content =
    authType === 'signup'
      ? "You've successfully signed up. We have sent a link to your email to verify your email address. Please click the link to confirm your account."
      : authType === 'magic-login'
      ? "You've successfully requested a magic login link. We have sent a login link to your email. Please click the link to log in."
      : authType === 'reset-password'
      ? "You've successfully requested a password reset. We have sent a password reset link to your email. Please click the link to reset your password."
      : "You've successfully made your request. Please check your email.";

  const subContent =
    authType === 'signup' ? (
      <>
        <p className="mt-2 text-sm text-muted-foreground">
          If you do not see the email, please check your spam folder. If the
          email is not there, then try to login
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          If the email is not there, then try to{' '}
          <Link
            href="/login"
            className="text-blue-500 hover:underline text-capitalize"
          >
            login
          </Link>
        </p>
      </>
    ) : null;
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">{title}</CardTitle>
            <CardDescription className="text-lg">{description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-base text-muted-foreground">{content}</p>
            {subContent}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
