export type Tier = {
  name: string;
  id: string;
  href: string;
  priceMonthly: string;
  description: string;
  features: string[];
  featured: boolean;
};

export const tiers: Tier[] = [
  {
    name: 'Free',
    id: 'tier-free',
    href: '/checkout?subscription=free',
    priceMonthly: '$0',
    description:
      "The perfect plan if you're just getting started with our product.",
    features: ['5 products', 'Up to 1,000 subscribers', 'Advanced analytics'],
    featured: false,
  },
  {
    name: 'Pro',
    id: 'tier-pro',
    href: '/checkout?subscription=pro',
    priceMonthly: '$29',
    description: 'A plan that scales your rapidly growing business.',
    features: [
      '25 products',
      'Up to 10,000 subscribers',
      'Dedicated Subdomain',
      'Advanced analytics',
      '24-hour support response time',
    ],
    featured: true,
  },
  {
    name: 'Enterprise',
    id: 'tier-enterprise',
    href: '/checkout?subscription=enterprise',
    priceMonthly: '$99',
    description: 'Dedicated support and infrastructure for your company.',
    features: [
      'Unlimited products',
      'Unlimited subscribers',
      'Full whitelabeled',
      'Advanced analytics',
      'Dedicated support representative',
      'Marketing automations',
      'Custom integrations',
    ],
    featured: false,
  },
];
