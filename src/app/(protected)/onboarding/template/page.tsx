import FileUploadFormDemo from '@/components/file-parent-form';
import { ProgressCard } from '@/components/progress-card';
import { Steps } from '@/components/steps';
import { getServerClient } from '@/utils/supabase/getServerClient';
import React from 'react';

type MarketingTemplatePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

async function MarketingTemplatePage({
  searchParams,
}: MarketingTemplatePageProps) {
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
              Your branding details are saved successfully. Now choose your
              marketing template.
            </p>
          </div>
          <ProgressCard value={60} />
        </div>

        <div className="py-8 flex flex-col gap-16 lg:flex-row lg:items-center lg:justify-between">
          <Steps step={3} />
          <FileUploadFormDemo />
        </div>
      </section>
    </main>
  );
}

export default MarketingTemplatePage;
