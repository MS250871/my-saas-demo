import { BrandingForm } from '@/components/branding-form';
import { ProgressCard } from '@/components/progress-card';
import { Steps } from '@/components/steps';
import { getServerClient } from '@/utils/supabase/getServerClient';
import React from 'react';

type BrandingPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

async function BrandingPage({ searchParams }: BrandingPageProps) {
  const resolvedSearchParams = await searchParams;
  const tenantId: string | undefined = Array.isArray(
    resolvedSearchParams?.tenantId
  )
    ? resolvedSearchParams?.tenantId[0] ||
      '84c9e931-3b7c-4b69-8e26-5a116e7a8f64'
    : resolvedSearchParams?.tenantId || '84c9e931-3b7c-4b69-8e26-5a116e7a8f64';

  const supabase = await getServerClient();
  const { data } = await supabase.auth.getUser();
  const userEmail: string | undefined = data?.user?.email ?? undefined;

  return (
    <main className="max-w-7xl mx-auto">
      <section className="relative isolate overflow-hidden px-6 py-24 sm:py-20 lg:px-8">
        <div className="w-full flex flex-col gap-4 md:flex-row md:items-center md:justify-between ">
          <div className="max-w-lg">
            {userEmail && (
              <span className="text-sm text-foreground">Hi, {userEmail},</span>
            )}
            <p className="text-sm text-muted-foreground">
              Your plan and subscription details are confirmed. Now provide us
              your branding details:
            </p>
          </div>
          <ProgressCard value={40} />
        </div>

        <div className="py-8 flex flex-col gap-16 lg:flex-row lg:items-start lg:justify-between lg:relative">
          {/* Sticky Steps Sidebar */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <Steps step={2} />
            </div>
          </div>
          {/* Form Content */}
          <div className="lg:w-2/3 w-full">
            <BrandingForm tenantId={tenantId ?? ''} />
          </div>
        </div>
      </section>
    </main>
  );
}

export default BrandingPage;
