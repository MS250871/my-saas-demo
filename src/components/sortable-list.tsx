'use client';

import React, { useState, useRef } from 'react';
import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { GripVertical, PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { EmptyState, EmptyStateAction } from '@/components/empty-state';

type ListItemType = {
  id: string;
  name: string;
  description: string;
};

type ActionInput = { label: string; icon?: React.ReactNode };

type Props = {
  initialItems: ListItemType[];
  onSubmit: (items: ListItemType[]) => void;
  showAddSeparator?: boolean;
  actions?: ActionInput[]; // Only label/icon from parent
  hoverDelayMs?: number;
  separatorHeight?: number;
  separatorMinHeight?: number;
  emptyStateTitle?: string;
  emptyStateDescription?: string;
  emptyStateKind?: 'single' | 'multi';
  emptyStateSingleLabel?: string;
  emptyStateSingleIcon?: React.ReactNode;
};

export function SortableList({
  initialItems,
  onSubmit,
  showAddSeparator = false,
  actions = [],
  hoverDelayMs = 180,
  separatorHeight = 36,
  separatorMinHeight = 8,
  emptyStateTitle = 'No items yet',
  emptyStateDescription = 'Start by adding your first item.',
  emptyStateKind = 'multi',
  emptyStateSingleLabel,
  emptyStateSingleIcon,
}: Props) {
  const [items, setItems] = useState<ListItemType[]>(initialItems);
  const [hoveredSeparator, setHoveredSeparator] = useState<number | null>(null);
  const [pendingHoveredSeparator, setPendingHoveredSeparator] = useState<
    number | null
  >(null);
  const [openSeparator, setOpenSeparator] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Always deterministic id for SSR/CSR
  const generateId = () =>
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : Math.random().toString(36).slice(2);

  // Always provide getNewItem internally
  const effectiveActions =
    actions.length > 0
      ? actions.map((action) => ({
          ...action,
          getNewItem: (_insertAt: number) => ({
            id: generateId(),
            name: action.label,
            description: `Added via ${action.label}.`,
          }),
        }))
      : [
          {
            label: 'Add Activity',
            icon: <PlusCircle className="mr-2 h-4 w-4" />,
            getNewItem: () => ({
              id: generateId(),
              name: 'New Activity',
              description: 'Added activity.',
            }),
          },
          {
            label: 'Add Resource',
            icon: <PlusCircle className="mr-2 h-4 w-4" />,
            getNewItem: () => ({
              id: generateId(),
              name: 'New Resource',
              description: 'Added resource.',
            }),
          },
        ];

  // Add at index
  const handleAddAt = (
    getNewItem: (insertAt: number) => ListItemType,
    insertAt: number
  ) => {
    const newItem = getNewItem(insertAt);
    setItems((prev) => [
      ...prev.slice(0, insertAt + 1),
      newItem,
      ...prev.slice(insertAt + 1),
    ]);
    setOpenSeparator(null);
  };

  // Drag
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id);
      const newIndex = items.findIndex((item) => item.id === over.id);
      setItems(arrayMove(items, oldIndex, newIndex));
    }
  };

  // Edit/Delete
  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  };

  const handleSubmit = () => {
    onSubmit(items);
  };

  // Delayed hover logic for separator
  function handleSeparatorEnter(i: number) {
    setPendingHoveredSeparator(i);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredSeparator(i);
      setPendingHoveredSeparator(null);
    }, hoverDelayMs);
  }
  function handleSeparatorLeave() {
    setPendingHoveredSeparator(null);
    setHoveredSeparator(null);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  }

  // Universal empty state config
  let emptyStateAction: EmptyStateAction;
  if (emptyStateKind === 'single') {
    emptyStateAction = {
      type: 'single',
      label: emptyStateSingleLabel || (actions[0]?.label ?? 'Add Item'),
      icon: emptyStateSingleIcon || (actions[0]?.icon ?? <PlusCircle />),
      onClick: () => handleAddAt(effectiveActions[0].getNewItem, -1),
    };
  } else {
    emptyStateAction = {
      type: 'multi',
      label: 'Add',
      icon: <PlusCircle />,
      actions: effectiveActions.map((action) => ({
        label: action.label,
        icon: action.icon,
        onClick: () => handleAddAt(action.getNewItem, -1),
      })),
    };
  }

  if (items.length === 0) {
    return (
      <div className="w-full mx-auto bg-background border rounded-lg shadow p-4 flex flex-col gap-2">
        <EmptyState
          title={emptyStateTitle}
          description={emptyStateDescription}
          action={emptyStateAction}
        />
      </div>
    );
  }

  return (
    <form
      className="w-full mx-auto bg-background border rounded-lg shadow p-4 flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {Array.from({ length: items.length + 1 }).map((_, i) => (
            <React.Fragment key={'sep-' + i}>
              {showAddSeparator && (
                <SeparatorWithAdd
                  show={hoveredSeparator === i || openSeparator === i}
                  isOpen={openSeparator === i}
                  onEnter={() => handleSeparatorEnter(i)}
                  onLeave={handleSeparatorLeave}
                  onOpenChange={(open) => setOpenSeparator(open ? i : null)}
                  actions={effectiveActions}
                  insertAt={i - 1}
                  onAddClick={handleAddAt}
                  separatorHeight={separatorHeight}
                  separatorMinHeight={separatorMinHeight}
                />
              )}
              {i < items.length && (
                <SortableListRow
                  item={items[i]}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )}
            </React.Fragment>
          ))}
        </SortableContext>
      </DndContext>
      <Button type="submit" className="mt-4 self-end">
        Create / Update
      </Button>
    </form>
  );
}

type SeparatorWithAddProps = {
  show: boolean;
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
  onOpenChange: (open: boolean) => void;
  actions: {
    label: string;
    icon?: React.ReactNode;
    getNewItem: (insertAt: number) => ListItemType;
  }[];
  insertAt: number;
  onAddClick: (
    getNewItem: (insertAt: number) => ListItemType,
    insertAt: number
  ) => void;
  separatorHeight: number;
  separatorMinHeight: number;
};

function SeparatorWithAdd({
  show,
  isOpen,
  onEnter,
  onLeave,
  onOpenChange,
  actions,
  insertAt,
  onAddClick,
  separatorHeight,
  separatorMinHeight,
}: SeparatorWithAddProps) {
  // Animate the region height, fade/scale the separator and button
  return (
    <div
      className={cn(
        'relative flex items-center transition-all duration-200 ease-in-out',
        show || isOpen ? 'py-2' : 'py-0'
      )}
      style={{
        height: show || isOpen ? separatorHeight : separatorMinHeight,
        minHeight: separatorMinHeight,
        maxHeight: separatorHeight,
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <div
        className={cn(
          'flex-1 mx-6 rounded',
          show || isOpen
            ? 'h-px bg-muted-foreground/50 transition-all duration-200'
            : 'h-0'
        )}
      />
      <DropdownMenu open={isOpen} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="sm"
            className={cn(
              'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10',
              'transition-opacity duration-200',
              show || isOpen
                ? 'opacity-100 scale-100 pointer-events-auto'
                : 'opacity-0 scale-75 pointer-events-none'
            )}
            aria-label="Add"
            tabIndex={0}
          >
            <PlusCircle />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {actions.map((action) => (
            <DropdownMenuItem
              key={action.label}
              onClick={() => onAddClick(action.getNewItem, insertAt)}
            >
              {action.icon}
              {action.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

type RowProps = {
  item: ListItemType;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

function SortableListRow({ item, onEdit, onDelete }: RowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition ?? 'transform 150ms',
        opacity: isDragging ? 0.5 : 1,
      }}
      className={cn(
        'group flex items-center gap-2 px-3 py-2 rounded bg-card border shadow-sm cursor-default hover:bg-muted transition-all',
        isDragging && 'opacity-80'
      )}
      tabIndex={0}
    >
      {/* Drag handle ONLY */}
      <span
        {...listeners}
        {...attributes}
        className="mr-2 text-muted-foreground cursor-grab active:cursor-grabbing"
        tabIndex={-1}
        aria-label="Drag"
      >
        <GripVertical className="w-5 h-5" />
      </span>
      {/* Name + description */}
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{item.name}</div>
        <div className="text-xs text-muted-foreground truncate">
          {item.description}
        </div>
      </div>
      {/* Actions */}
      <div className="flex items-center gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-all">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onEdit(item.id)}
          className="p-1 rounded hover:bg-muted"
          aria-label="Edit"
        >
          <Pencil className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => onDelete(item.id)}
          className="p-1 rounded text-destructive hover:bg-destructive/10 hover:text-destructive"
          aria-label="Delete"
        >
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
