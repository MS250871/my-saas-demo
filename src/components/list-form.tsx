'use client';

import { SortableList } from '@/components/sortable-list';
import { PlusCircle, FilePlus2 } from 'lucide-react';
import React from 'react';

const initialItems = [
  { id: '1', name: 'First Item', description: 'First description' },
  { id: '2', name: 'Second Item', description: 'Another description' },
  { id: '3', name: 'Third Item', description: 'More details here' },
];

// Example dynamic actions, could be passed from parent or defined here
const addActions = [
  {
    label: 'Add Activity',
    icon: <PlusCircle className="mr-2 h-4 w-4" />,
    onClick: (
      insertAt: number,
      setItems: (fn: (prev: typeof initialItems) => typeof initialItems) => void
    ) => {
      setItems((prev) => [
        ...prev.slice(0, insertAt + 1),
        {
          id: Math.random().toString(36).slice(2),
          name: 'New Activity',
          description: 'Added via Activity action.',
        },
        ...prev.slice(insertAt + 1),
      ]);
    },
  },
  {
    label: 'Add Resource',
    icon: <FilePlus2 className="mr-2 h-4 w-4" />,
    onClick: (
      insertAt: number,
      setItems: (fn: (prev: typeof initialItems) => typeof initialItems) => void
    ) => {
      setItems((prev) => [
        ...prev.slice(0, insertAt + 1),
        {
          id: Math.random().toString(36).slice(2),
          name: 'New Resource',
          description: 'Added via Resource action.',
        },
        ...prev.slice(insertAt + 1),
      ]);
    },
  },
];

export function ListForm() {
  const [items, setItems] = React.useState(initialItems);

  const handleSubmit = (submittedItems: typeof initialItems) => {
    // Send to API or DB
    console.log('Submitting order:', submittedItems);
  };

  return (
    <div className="w-full">
      <SortableList
        initialItems={items}
        onSubmit={handleSubmit}
        showAddSeparator={true}
        actions={addActions.map((action) => ({
          label: action.label,
          icon: action.icon,
          onClick: (insertAt: number) => action.onClick(insertAt, setItems),
        }))}
      />
    </div>
  );
}
