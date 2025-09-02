import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import React from 'react';

export type EmptyStateAction =
  | {
      type: 'single';
      label: string;
      icon?: React.ReactNode;
      onClick: () => void;
    }
  | {
      type: 'multi';
      label: string;
      icon?: React.ReactNode;
      actions: { label: string; icon?: React.ReactNode; onClick: () => void }[];
    };

export type EmptyStateProps = {
  title?: string;
  description?: string;
  action: EmptyStateAction;
};

export function EmptyState({
  title = 'Nothing here yet',
  description,
  action,
}: EmptyStateProps) {
  if (action.type === 'single') {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        {action.icon && <span className="mb-2">{action.icon}</span>}
        <h3 className="text-lg font-semibold">{title}</h3>
        {description && (
          <p className="text-muted-foreground mb-4 text-sm">{description}</p>
        )}
        <Button onClick={action.onClick} size="sm" className="flex gap-2">
          {action.icon}
          {action.label}
        </Button>
      </div>
    );
  }

  // Multi-action dropdown
  return (
    <div className="flex flex-col items-center justify-center py-20">
      {action.icon && <span className="mb-2">{action.icon}</span>}
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && (
        <p className="text-muted-foreground mb-4 text-sm">{description}</p>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" className="flex gap-2">
            {action.icon}
            {action.label}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {action.actions.map((a) => (
            <DropdownMenuItem key={a.label} onClick={a.onClick}>
              {a.icon}
              {a.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
