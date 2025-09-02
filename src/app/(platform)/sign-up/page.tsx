import { GalleryVerticalEnd } from 'lucide-react';
import { featureList } from '@/lib/featureList';
import Link from 'next/link';

import { SignUpForm } from '@/components/sign-up-form';

export default async function SignUpPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const resolvedSearchParams = await searchParams;
  let errors: Record<string, string> = {};
  let values: Record<string, string> = {};

  const errorsParam = resolvedSearchParams?.errors;
  const valuesParam = resolvedSearchParams?.values;

  if (typeof errorsParam === 'string') {
    try {
      errors = JSON.parse(decodeURIComponent(errorsParam));
    } catch {}
  }

  if (typeof valuesParam === 'string') {
    try {
      values = JSON.parse(decodeURIComponent(valuesParam));
    } catch {}
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-gray-900 dark:bg-gray-100 relative hidden lg:flex lg:lg:flex-col lg:items-start lg:justify-center lg:gap-12 lg:p-20">
        <h2 className="text-5xl font-bold text-background">
          Your SaaS Ready To Launch
        </h2>
        <p className="text-lg text-background/80">
          A complete starter template to showcase authentication, subscriptions,
          and customer journeys.
        </p>
        <ul className="flex flex-col gap-4">
          {featureList.map((item) => (
            <li
              key={item.id}
              className="text-background/80 list-disc list-inside"
            >
              {item.feature}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Your SAAS Logo
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm errors={errors} values={values} />
          </div>
        </div>
      </div>
    </div>
  );
}
