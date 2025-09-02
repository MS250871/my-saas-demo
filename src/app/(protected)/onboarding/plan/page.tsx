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
  const tenantId = resolvedSearchParams?.tenantId;

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
              You company has been created. Now buy the plan which suits your
              needs.
            </p>
          </div>
          <ProgressCard value={20} />
        </div>

        <div className="py-8 flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
          <Steps step={1} />
          <PricingForm />
        </div>
      </section>
    </main>
  );
}

export default BuyPlanPage;
