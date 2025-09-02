export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <h1 className="sr-only">Enterprise SaaS Platform Authentication Demo</h1>

      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold text-foreground">Platform</h2>
        <p className="mt-2 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          Enterprise SaaS Platform
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-700 dark:text-gray-300 sm:text-xl">
        Secure, scalable, B2B authentication with support for domain based
        (complete whitelable) or subdomain / path based tenant access. Built for
        startups to launch MVPs within 8 to 12 weeks with enterprise grade
        security.
      </p>
    </section>
  );
}
