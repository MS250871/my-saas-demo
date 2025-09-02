'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { TriangleAlert } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getBrowserClient } from '@/utils/supabase/getBrowserClient';
import {
  CompanyOrgSchema,
  companyTypes,
  employees,
  CompanyOrgType,
} from '@/lib/validations/companySchema';
import { ComboboxField } from '@/components/combobox-field';
import { useAsyncOptions } from '@/hooks/useAsyncOptions';
import axios from 'axios';

type OptionType = { id: number; name: string };

export default function CompanyOrgForm({ userId }: { userId?: string }) {
  const form = useForm<CompanyOrgType>({
    resolver: zodResolver(CompanyOrgSchema),
    defaultValues: {
      owner_id: userId ?? '',
      company_name: '',
      company_email: '',
      company_mobile: '',
      company_website: '',
      company_address_1: '',
      company_address_2: '',
      country: { id: 101, name: 'India' },
      state: { id: undefined, name: '' },
      city: { id: undefined, name: '' },
      postal_code: '',
      company_type: 'proprietorship',
      no_of_employees: '',
    },
  });

  const router = useRouter();
  const [formError, setFormError] = useState<string | null>(null);

  // Popover open states
  const [openCombo, setOpenCombo] = useState({
    country: false,
    state: false,
    city: false,
  });

  // Watchers for cascading combos
  const watchCountry = form.watch('country');
  const watchState = form.watch('state');

  // Options fetching
  const countryAsync = useAsyncOptions<OptionType>(
    async (input) => {
      const supabase = getBrowserClient();
      const { data } = await supabase
        .from('countries')
        .select('id, name')
        .ilike('name', `%${input}%`)
        .order('name', { ascending: true });
      return (data as OptionType[]) ?? [];
    },
    [],
    ''
  );
  const stateAsync = useAsyncOptions<OptionType>(
    async (input) => {
      if (!watchCountry?.id) return [];
      const supabase = getBrowserClient();
      const { data } = await supabase
        .from('states')
        .select('id, name')
        .eq('country_id', watchCountry.id)
        .ilike('name', `%${input}%`)
        .order('name', { ascending: true });
      return (data as OptionType[]) ?? [];
    },
    [watchCountry?.id],
    ''
  );
  const cityAsync = useAsyncOptions<OptionType>(
    async (input) => {
      if (!watchState?.id) return [];
      const supabase = getBrowserClient();
      const { data } = await supabase
        .from('cities')
        .select('id, name')
        .eq('state_id', watchState.id)
        .ilike('name', `%${input}%`)
        .order('name', { ascending: true });
      return (data as OptionType[]) ?? [];
    },
    [watchState?.id],
    ''
  );

  // Reset state/city when country/state changes
  useEffect(() => {
    form.setValue('state', undefined as any);
    form.setValue('city', undefined as any);
  }, [watchCountry?.id]);
  useEffect(() => {
    form.setValue('city', undefined as any);
  }, [watchState?.id]);

  // useEffect(() => {
  //   router.prefetch(`/onboarding/branding`);
  // }, []);

  // Helpers for rendering fields
  const renderInputField = (
    name: keyof CompanyOrgType,
    label: string,
    type: string = 'text',
    props: any = {}
  ) => (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="mb-2">{label}</FormLabel>
          <FormControl>
            <Input type={type} {...field} {...props} />
          </FormControl>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );

  // Helper for Combobox fields
  const renderComboboxField = (
    name: keyof CompanyOrgType,
    label: string,
    placeholder: string,
    options: OptionType[],
    input: string,
    setInput: React.Dispatch<React.SetStateAction<string>>,
    disabled: boolean,
    open: boolean,
    setOpen: (open: boolean) => void
  ) => (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <ComboboxField
          field={field}
          label={label}
          placeholder={placeholder}
          options={options}
          input={input}
          setInput={setInput}
          disabled={disabled}
          open={open}
          setOpen={setOpen}
        />
      )}
    />
  );

  // Helper for Select fields
  const renderSelectField = (
    name: keyof CompanyOrgType,
    label: string,
    options: { value: string; label: string }[],
    placeholder: string
  ) => (
    <FormField
      control={form.control}
      name={name as any}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="mb-2">{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={placeholder}
                  className={cn(!field.value && 'text-muted-foreground')}
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage className="text-xs" />
        </FormItem>
      )}
    />
  );

  // Submit handler
  async function onSubmit(values: CompanyOrgType) {
    console.log(values);
    setFormError(null);
    try {
      const response = await axios.post('/api/tenants/new', values);
      if (response.data.error) {
        setFormError(response.data.error.message);
      } else {
        const tenantId = response.data.tenant.id;
        router.push(`/onboarding/branding?tenantId=${tenantId}`);
      }
    } catch (e: any) {
      setFormError(e.message || 'An unknown error occurred.');
    }
  }

  const gridCols =
    'grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-x-8 md:gap-y-6';

  return (
    <div className="w-full p-4 border rounded-lg md:p-8 lg:p-12">
      {formError && (
        <Alert variant="destructive" className="mb-8 bg-red-50 border-red-200">
          <TriangleAlert className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(gridCols, 'w-full mt-8 items-start')}
          autoComplete="off"
        >
          {renderInputField('owner_id', 'Owner ID', 'text', { disabled: true })}
          {renderInputField('company_name', 'Company Name')}
          {renderInputField('company_email', 'Company Email', 'email')}
          {renderInputField('company_mobile', 'Company Mobile')}
          {renderInputField('company_website', 'Company Website', 'text', {
            placeholder: 'www.example.com',
          })}
          {renderInputField('company_address_1', 'Company Address 1')}
          {renderInputField('company_address_2', 'Company Address 2')}

          {renderComboboxField(
            'country',
            'Country',
            'Select country',
            countryAsync.options,
            countryAsync.input,
            countryAsync.setInput,
            false,
            openCombo.country,
            (open) => setOpenCombo((c) => ({ ...c, country: open }))
          )}
          {renderComboboxField(
            'state',
            'State',
            'Select state',
            stateAsync.options,
            stateAsync.input,
            stateAsync.setInput,
            !watchCountry?.id,
            openCombo.state,
            (open) => setOpenCombo((c) => ({ ...c, state: open }))
          )}
          {renderComboboxField(
            'city',
            'City',
            'Select city',
            cityAsync.options,
            cityAsync.input,
            cityAsync.setInput,
            !watchState?.id,
            openCombo.city,
            (open) => setOpenCombo((c) => ({ ...c, city: open }))
          )}

          {renderInputField('postal_code', 'Postal Code')}

          {renderSelectField(
            'company_type',
            'Company Type',
            companyTypes,
            'Choose company type'
          )}
          {renderSelectField(
            'no_of_employees',
            'No. of Employees',
            employees,
            'Select a number of employees'
          )}

          {/* Submit button */}
          <div className="col-span-2 md:col-span-2 flex mt-4">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? 'Creating...'
                : 'Create Organization & Next'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
