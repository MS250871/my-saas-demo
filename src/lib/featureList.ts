import {
  Package,
  Users,
  ListStartIcon,
  ShieldCheck,
  ArrowUpDown,
  Database,
  LucideIcon,
} from 'lucide-react';

export type Feature = {
  id: number;
  icon: LucideIcon;
  title: string;
  description: string;
};

export const features: Feature[] = [
  {
    id: 1,
    icon: Package,
    title: 'Unlimited Products',
    description:
      'Offer unlimited products to your customers with our flexible plans.',
  },
  {
    id: 2,
    icon: Users,
    title: 'Unlimited Subscriptions',
    description:
      'Provide unlimited subscriptions to your customers with our flexible plans.',
  },
  {
    id: 3,
    icon: ListStartIcon,
    title: 'Priority Support',
    description:
      'Get prioritized support for your customers with our flexible plans.',
  },
  {
    id: 4,
    icon: ShieldCheck,
    title: 'Advanced Security',
    description:
      'Ensure the highest level of security for your customers with our flexible plans.',
  },
  {
    id: 5,
    icon: ArrowUpDown,
    title: 'Advanced API',
    description:
      'Unlock advanced API capabilities for your customers with our flexible plans.',
  },
  {
    id: 6,
    icon: Database,
    title: 'Flexible Database',
    description:
      'Utilize a flexible database solution for your customers with our flexible plans.',
  },
];

export type FeatureListItem = {
  id: number;
  feature: string;
};

export const featureList: FeatureListItem[] = [
  {
    id: 1,
    feature:
      'Pre-built Sign Up & Login flows with email, phone, magic-link & google OAuth',
  },
  {
    id: 2,
    feature:
      'Seamless Stripe/ Razorpay subscription integration (test-ready, no real charges)',
  },
  {
    id: 3,
    feature:
      'Company Onboarding with branding, workspace setup, and user invites',
  },
  { id: 4, feature: 'Fully functional admin dashboard' },
  {
    id: 5,
    feature:
      'Customer facing marketing page to experience the product as your users would.',
  },
];
