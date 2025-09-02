import Image from 'next/image';
import { features } from '@/lib/featureList';

function FeaturesPage() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-base font-semibold text-foreground">
          Just A Sample
        </h2>
        <p className="mt-2 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
          AI Enabbled Workflows To Keep You Ahead
        </p>
      </div>
      <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-700 dark:text-gray-300 sm:text-xl">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis earum
        quaerat aliquam officiis repellat dolores natus consectetur beatae
        recusandae, quam, nemo eius pariatur? A nemo odit quibusdam.
      </p>
      <div className="relative w-full max-w-6xl mt-12 mx-auto border-2 rounded-t-3xl border-b-0 overflow-hidden shadow-2xl">
        {/* Light mode image */}
        <Image
          src="/images/dashboard image.webp"
          alt="Feature (light mode)"
          width={600}
          height={400}
          className="block dark:hidden w-full h-auto"
          priority
        />
        {/* Dark mode image */}
        <Image
          src="/images/dark dashboard image.webp"
          alt="Feature (dark mode)"
          width={600}
          height={400}
          className="hidden dark:block w-full h-auto"
          priority
        />
      </div>
      <div>
        <ul className="mt-12 max-w-6xl mx-auto grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const { id, icon: Icon, title, description } = feature;
            return (
              <li key={id} className="flex items-start justify-center p-4">
                <div className="flex items-start">
                  <Icon className="flex-shrink-0 w-10 h-10 p-1.5 mr-3 rounded-lg text-foreground bg-foreground/10" />
                  <div>
                    <span className="text-lg font-medium">{title}.</span>
                    <span className="ml-2 text-lg text-gray-500">
                      {description}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default FeaturesPage;
