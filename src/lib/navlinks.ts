import { IconType } from 'react-icons';
import {
  Building,
  Presentation,
  ReceiptIndianRupee,
  UsersRound,
  NotebookText,
  CircleQuestionMark,
  BookOpenCheck,
  BriefcaseBusiness,
  LayoutDashboard,
  Settings,
  UserPlus,
  HandHelping,
  BookOpen,
} from 'lucide-react';
import { FaFacebook, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

// Nav and Legal Links Types
export interface SimpleNavLink {
  href: string;
  label: string;
}

// Social Link Type
export interface SocialLink extends SimpleNavLink {
  icon: IconType;
}

// Tenant Admin Link Type
export interface TenantNavLink extends SimpleNavLink {
  icon: React.ComponentType<any>;
}

export const navLinks: SimpleNavLink[] = [
  { href: '/features', label: 'Features' },
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
];

export const legalLinks: SimpleNavLink[] = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Service' },
];

export const socialLinks: SocialLink[] = [
  { href: 'https://twitter.com', label: 'Twitter', icon: FaTwitter },
  { href: 'https://facebook.com', label: 'Facebook', icon: FaFacebook },
  { href: 'https://instagram.com', label: 'Instagram', icon: FaLinkedinIn },
];

export const tenantAdminLinks: {
  main: TenantNavLink[];
  saas: TenantNavLink[];
  secondary: TenantNavLink[];
} = {
  main: [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/company', label: 'Company Details', icon: Building },
    { href: '/admin/branding', label: 'Branding', icon: Presentation },
    {
      href: '/admin/billing',
      label: 'Plan And Billing',
      icon: ReceiptIndianRupee,
    },
    { href: '/admin/users', label: 'Users', icon: UsersRound },
  ],
  saas: [
    { href: '/admin/leads', label: 'Leads', icon: UserPlus },
    { href: '/admin/courses', label: 'Courses', icon: NotebookText },
    { href: '/admin/questions', label: 'Questions', icon: CircleQuestionMark },
    { href: '/admin/tests', label: 'Tests', icon: BookOpenCheck },
    {
      href: '/admin/jobs',
      label: 'Jobs',
      icon: BriefcaseBusiness,
    },
  ],
  secondary: [
    { href: '/admin/help', label: 'Get Help', icon: HandHelping },
    { href: '/admin/docs', label: 'Docs', icon: BookOpen },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ],
};
