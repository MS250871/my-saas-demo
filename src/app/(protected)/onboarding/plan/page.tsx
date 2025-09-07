import { ProgressCard } from '@/components/progress-card';
import { Steps } from '@/components/steps';
import { getServerClient } from '@/utils/supabase/getServerClient';
import React from 'react';
import PricingForm from '@/components/pricing-form';

type BuyPlanPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

async function BuyPlanPage({ searchParams }: BuyPlanPageProps) {
  const resolvedSearchParams = await searchParams;
  const tenantId = Array.isArray(resolvedSearchParams?.tenantId)
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
              Upgrade to enjoy more features. Now buy the plan which suits your
              needs.
            </p>
          </div>
          <ProgressCard value={20} />
        </div>

        <div className="py-8 flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
          <Steps step={3} />
          <PricingForm tenantId={tenantId as string} />
        </div>
      </section>
    </main>
  );
}

export default BuyPlanPage;
