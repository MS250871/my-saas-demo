import React from 'react';
import { Check } from 'lucide-react';
import { tiers } from '@/lib/pricingTiers';
import Link from 'next/link';
import { Button } from './ui/button';

function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

function PricingForm() {
  return (
    <div className="w-full mt-16 border rounded-3xl p-8">
      <p className="text-3xl font-bold text-foreground">
        Choose the plan that best fits your needs
      </p>
      <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-10 lg:max-w-4xl">
        {tiers.map((tier, idx) => {
          const isFeatured = tier.featured;
          return (
            <div
              key={tier.id}
              className={classNames(
                'flex flex-col h-full w-full max-w-md rounded-2xl p-8 shadow-sm transition-all duration-300',
                isFeatured
                  ? 'bg-white dark:bg-white/5 text-gray-900 dark:text-white ring-1 ring-white/10 shadow-xl z-10 relative'
                  : 'bg-white dark:bg-white/5 text-gray-900 dark:text-white ring-1 ring-gray-200 dark:ring-white/10',
                // isFeatured ? 'sm:mt-0' : 'sm:mt-8',
                'sm:p-10'
              )}
              style={
                isFeatured
                  ? { boxShadow: '0 10px 40px 0 rgba(0,0,0,0.18)' }
                  : {}
              }
            >
              <h3
                id={tier.id}
                className={classNames(
                  'text-foreground text-base font-semibold'
                )}
              >
                {tier.name}
              </h3>
              <p className="mt-4 flex items-baseline gap-x-2">
                <span className="text-5xl font-bold tracking-tight">
                  {tier.priceMonthly}
                </span>
                <span className="text-base text-gray-500 dark:text-gray-400">
                  /month
                </span>
              </p>
              <p className="mt-6 text-base font-medium">{tier.description}</p>
              <ul role="list" className="mt-8 space-y-3 text-sm sm:mt-10">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check
                      aria-hidden="true"
                      className={classNames(
                        'h-5 w-5 flex-none',
                        'text-foreground'
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href={tier.href}
                aria-describedby={tier.id}
                className="mt-8 inline-block w-full"
              >
                <Button
                  variant={isFeatured ? 'default' : 'outline'}
                  className="w-full"
                >
                  Get started today
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PricingForm;
