'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { ModeToggle } from './mode-toggle';

interface NavbarOnboardingProps {
  brand?: React.ReactNode;
  userEmail?: string;
}

export function NavbarOnboarding({ brand }: NavbarOnboardingProps) {
  return (
    <>
      <nav className="w-full bg-transparent">
        <div className="w-full max-w-7xl mx-auto flex h-16 items-center px-3 md:px-5 text-sm">
          {/* Brand (left) */}
          <div className="flex items-center font-semibold flex-shrink-0">
            <Link href="/" className="text-2xl font-bold hover:opacity-80">
              {brand || 'Your SaaS Logo'}
            </Link>
          </div>
          {/* Action Buttons - right (desktop only) */}
          <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
            <form
              action="/auth/logout"
              method="POST"
              style={{ display: 'inline' }}
            >
              <Button type="submit" variant="outline" size="sm">
                Sign Out
              </Button>
            </form>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </>
  );
}
