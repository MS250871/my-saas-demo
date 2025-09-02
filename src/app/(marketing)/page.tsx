import { Hero } from '@/components/hero';
import { AutoStepper } from '@/components/auto-stepper';

export default function Home() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8 items-center">
      <div className="flex-1 flex flex-col gap-20 max-w-7xl p-5">
        <Hero />
      </div>
      <div className="max-w-7xl mx-auto">
        <AutoStepper currentStep={0} />
      </div>
    </div>
  );
}
