import { HeaderOnboarding } from '@/components/header-onboarding';
import { getServerClient } from '@/utils/supabase/getServerClient';

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await getServerClient();
  const { data } = await supabase.auth.getUser();
  const userEmail: string | undefined = data?.user?.email ?? undefined;
  return (
    <>
      <HeaderOnboarding userEmail={userEmail} />
      {children}
    </>
  );
}
