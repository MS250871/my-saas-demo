import React from 'react';
import { NavbarOnboarding } from '@/components/navbar-onboarding';

export function HeaderOnboarding({
  userEmail = 'sample@email.com',
}: {
  userEmail: string | undefined;
}): React.ReactElement {
  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <NavbarOnboarding brand="Your SaaS Logo" userEmail={userEmail} />
      </header>
    </>
  );
}
