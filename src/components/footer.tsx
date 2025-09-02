import { ModeToggle } from '@/components/mode-toggle';
import { navLinks, legalLinks, socialLinks } from '@/lib/navlinks';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center border-t text-center text-sm gap-8 py-8">
      <div className="max-w-5xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 px-4">
        <div>
          <ul className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {socialLinks.map((link) => {
              const { href, label, icon: Icon } = link;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <Icon className="w-8 h-8 p-1.5 text-foreground/60 bg-foreground/10 rounded-2xl" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <p className="mr-4">
          Powered by{' '}
          <a
            href="https://nimblestack.in"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            nimblestack
          </a>
        </p>
        <ModeToggle />
      </div>
    </footer>
  );
}
