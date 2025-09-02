import Link from 'next/link';
import { Button } from '@/components/ui/button';

function NotFound() {
  return (
    <main className="grid min-h-full place-items-center bg-background px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-4xl font-semibold text-foreground">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-foreground sm:text-7xl">
          Page not found
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-600 dark:text-gray-400 sm:text-xl/8">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/">
            <Button variant="default">Go back home</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
