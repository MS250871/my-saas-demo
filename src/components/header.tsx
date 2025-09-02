import { Navbar } from './navbar';
import { navLinks } from '@/lib/navlinks';
import { AuthButton } from './auth-button';
import { getServerClient } from '@/utils/supabase/getServerClient';

export async function Header() {
  const supabase = await getServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Only pass user if email is defined
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <Navbar
        navLinks={navLinks}
        brand="Your SaaS Logo"
        actionButtons={
          user?.email ? (
            <AuthButton user={{ email: user.email }} />
          ) : (
            <AuthButton user={null} />
          )
        }
      />
    </header>
  );
}
