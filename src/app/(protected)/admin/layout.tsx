import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebarTenantAdmin } from '@/components/app-sidebar-tenant-admin';
import { TopMenu } from '@/components/top-menu';
import { cookies } from 'next/headers';

export default async function TenantProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get('sidebar_admin_state')?.value === 'false';
  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebarTenantAdmin variant="inset" />
      <SidebarInset>
        <TopMenu />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
