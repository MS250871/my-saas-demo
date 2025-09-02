import { Progress } from '@/components/ui/progress';

interface ProgressCardProps {
  value: number;
}

export function ProgressCard({ value }: ProgressCardProps) {
  return (
    <div className="w-full max-w-lg flex flex-col gap-4 rounded-md border py-4 px-8">
      <p className="text-sm font-bold">Onboarding Progress</p>
      <Progress value={value} />
      <p className="text-sm text-gray-500">{value}% completed</p>
    </div>
  );
}
