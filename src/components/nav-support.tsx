'use client';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from './ui/sidebar';
import Link from 'next/link';
import React from 'react';

export function NavSupport({
  items,
}: {
  items: { href: string; label: string; icon: React.ComponentType<any> }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Support</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton asChild>
              <Link href={item.href}>
                <item.icon />
                {item.label}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
