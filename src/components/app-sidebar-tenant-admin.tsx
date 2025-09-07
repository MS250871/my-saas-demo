'use client';

import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';
import { NavWorkspace } from './nav-workspace';
import { tenantAdminLinks } from '@/lib/navlinks';
import { NavSaas } from './nav-saas';
import { NavSupport } from './nav-support';
import { SidebarFooterElement } from './sidebar-footer';

export function AppSidebarTenantAdmin({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/">Admin</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavSaas items={tenantAdminLinks.saas} />
        <NavSupport items={tenantAdminLinks.secondary} />
      </SidebarContent>
      <SidebarFooterElement />
    </Sidebar>
  );
}
