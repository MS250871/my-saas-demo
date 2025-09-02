import { cn } from '@/lib/utils';
import { CheckCircle, Circle } from 'lucide-react';

const steps = [
  {
    label: 'Start',
    description: `Your customer arrives at your home page, exploring the sleek design, engaging content, and standout features of your product. This is your chance to make a lasting first impression—let’s get them started on their journey toward becoming a happy customer.`,
    highlight: `Scroll up and sign up as a tenant to begin the experience.`,
  },
  {
    label: 'Sign Up',
    description: `Your customer signs up in seconds—choosing from email & password, phone & password, magic link, or Google OAuth login. The process is quick, intuitive, and designed to minimize friction.`,
  },
  {
    label: 'Phone or Email Verification',
    description: `We verify phone numbers and emails instantly to ensure every user is genuine and secure. Magic link logins are automatically verified for an even faster entry.`,
  },
  {
    label: 'Buy Subscription',
    description: `Your customer browses the available subscription plans and selects one that suits their needs. Our fully integrated Stripe test environment simulates the payment experience—secure, smooth, and real-to-life (no actual charges made).`,
  },
  {
    label: 'Company Onboarding',
    description: `Next, your customer creates their company workspace—adding the company name, email, and branding details. This step personalizes their experience and makes the platform feel truly theirs.`,
  },
  {
    label: 'Dashboard',
    description: `Welcome to the owner/admin dashboard—the control center for managing teams, subscriptions, and account settings. From here, your customer can explore every feature and maximize the platform’s value.`,
    highlight: `Enhance the experience—invite a few team members and see how effortlessly they can join.`,
  },
  {
    label: 'Now, step into your customer’s shoes',
    description: `Visit your branded marketing page as if you were one of your own users. Sign up, log in, purchase a subscription, and explore the platform just as they would. This is your chance to experience firsthand exactly what your customers will see, feel, and enjoy.`,
  },
];

type AuthStepperProps = {
  currentStep: number; // 0-based index
};

export function AutoStepper({ currentStep }: AuthStepperProps) {
  return (
    <div className="flex flex-col gap-0 relative">
      <h3 className="text-4xl font-bold text-center mb-10 lg:text-5xl max-w-3xl">
        See your SaaS through your customer’s eyes.
      </h3>
      <p className="mx-auto max-w-2xl text-center text-lg text-gray-700 dark:text-gray-300 sm:text-xl">
        Step into a realistic, hands-on demo that takes you through every stage
        of the customer journey. From the moment they land on your branded
        marketing page, to signing up, securely paying via Stripe, inviting team
        members, and exploring the product, you’ll experience exactly what your
        users will see and feel—smooth, intuitive, and ready for scale.
      </p>
      <div className="mt-12 flex flex-col gap-8 max-w-xl mx-auto">
        {steps.map((step, idx) => (
          <div key={step.label} className="flex items-start">
            {/* Vertical line */}
            <div className="flex flex-col items-center mr-4">
              <div>
                {idx < currentStep ? (
                  <CheckCircle className="text-green-600" size={24} />
                ) : (
                  <Circle
                    className={cn(
                      idx === currentStep ? 'text-black' : 'text-gray-300'
                    )}
                    size={24}
                  />
                )}
              </div>
              {/* Draw the line except for the last step */}
              {idx !== steps.length - 1 && (
                <div className="w-px bg-gray-300 h-16 mt-2" />
              )}
            </div>
            {/* Step content */}
            <div className="pb-10">
              <div
                className={cn(
                  'font-semibold',
                  idx === currentStep &&
                    'text-gray-800 dark:text-gray-200 text-lg'
                )}
              >
                {step.label}
              </div>
              <div className="text-base max-w-2xl text-gray-600 dark:text-gray-400 mb-0">
                {step.description}
                <span className="ml-1 text-gray-800 dark:text-gray-200 font-semibold">
                  {step.highlight}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
