import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { ChevronsUpDown, Check } from 'lucide-react';
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/components/ui/command';
import { cn } from '@/lib/utils';

type OptionType = { id: number; name: string };

export function ComboboxField({
  field,
  label,
  placeholder,
  options,
  input,
  setInput,
  disabled,
  open,
  setOpen,
}: {
  field: any;
  label: string;
  placeholder: string;
  options: OptionType[];
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  disabled?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const selected = field.value;
  return (
    <FormItem>
      <FormLabel className="mb-2">{label}</FormLabel>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                'w-full relative pl-3 pr-10 text-left justify-start',
                !selected && 'text-muted-foreground'
              )}
              disabled={disabled}
              type="button"
            >
              {selected ? selected.name : placeholder}
              <ChevronsUpDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50 pointer-events-none" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="w-[var(--radix-popover-trigger-width)] p-0"
        >
          <Command>
            <CommandInput
              placeholder={`Search ${label.toLowerCase()}...`}
              value={input}
              onValueChange={setInput}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
              <CommandGroup>
                {options.map((opt) => (
                  <CommandItem
                    value={opt.name}
                    key={opt.id}
                    onSelect={() => {
                      field.onChange(opt);
                      setOpen(false);
                    }}
                  >
                    {opt.name}
                    <Check
                      className={cn(
                        'ml-auto h-4 w-4',
                        selected?.id === opt.id ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <FormMessage className="text-xs" />
    </FormItem>
  );
}
