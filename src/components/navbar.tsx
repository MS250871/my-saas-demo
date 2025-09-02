'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import React from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
} from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';

export interface NavLink {
  href: string;
  label: string;
}

interface NavbarProps {
  navLinks: NavLink[];
  brand?: React.ReactNode;
  actionButtons?: React.ReactNode;
}

export function Navbar({ navLinks, brand, actionButtons }: NavbarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const actionButtonsArr = React.Children.toArray(actionButtons);

  return (
    <nav className="w-full bg-transparent">
      <div className="w-full max-w-7xl mx-auto flex h-16 items-center px-3 md:px-5 text-sm">
        {/* Brand (left) */}
        <div className="flex items-center font-semibold flex-shrink-0">
          <Link href="/" className="text-2xl font-bold hover:opacity-80">
            {brand || 'Nimblestack'}
          </Link>
        </div>

        {/* NavLinks - center (desktop only) */}
        <div className="hidden md:flex flex-1 justify-center gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                'px-3 py-2 rounded transition-colors font-medium relative' +
                (isActive(link.href)
                  ? ' bg-accent text-accent-foreground shadow'
                  : ' hover:bg-muted')
              }
              aria-current={isActive(link.href) ? 'page' : undefined}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute left-0 bottom-0 w-full h-[2px] rounded bg-foreground/80" />
              )}
            </Link>
          ))}
        </div>

        {/* Action Buttons - right (desktop only) */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0 ml-auto">
          {actionButtonsArr?.map((btn, idx) => (
            <span key={idx}>{btn}</span>
          ))}
        </div>

        {/* Mobile Hamburger - right */}
        <div className="md:hidden flex-1 flex justify-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open navigation menu"
                className="focus:outline-none"
              >
                <MenuIcon className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              aria-describedby={undefined}
              className="p-0 w-[80vw] max-w-xs"
            >
              <SheetTitle className="sr-only">Main Navigation</SheetTitle>
              <div className="flex items-center justify-between px-4 py-3 border-b">
                <span className="font-bold text-lg">
                  {brand || 'Nimblestack'}
                </span>
              </div>
              <div className="flex flex-col gap-2 p-4">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className={
                        'block text-base font-medium py-2 rounded transition-colors px-2' +
                        (isActive(link.href)
                          ? ' bg-accent text-accent-foreground shadow'
                          : ' hover:bg-muted')
                      }
                      aria-current={isActive(link.href) ? 'page' : undefined}
                    >
                      {link.label}
                    </Link>
                  </SheetClose>
                ))}
                {/* Action Buttons in sheet (mobile) */}
                {actionButtons && (
                  <div className="mt-4 border-t pt-4 flex flex-col gap-2">
                    {actionButtonsArr.map((btn, idx) => (
                      <SheetClose asChild key={idx}>
                        {btn}
                      </SheetClose>
                    ))}
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
