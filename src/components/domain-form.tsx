'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from './ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Choicebox,
  ChoiceboxItem,
  ChoiceboxItemHeader,
  ChoiceboxItemTitle,
  ChoiceboxItemSubtitle,
  ChoiceboxItemDescription,
  ChoiceboxItemContent,
  ChoiceboxItemIndicator,
} from '@/components/ui/shadcn-io/choicebox';
import { domainSchema, DomainType } from '@/lib/validations/domainSchema';

const options = [
  {
    id: 1,
    title: 'Path based domain',
    sub_title: 'Available with free trail',
    domain_type: 'path',
    look_like: 'www.mysaas.com/tenant/dashboard',
  },
  {
    id: 2,
    title: 'Subdomain ',
    sub_title: 'Available with Pro Plan',
    domain_type: 'subdomain',
    look_like: 'tenant.mysaas.com/dashboard',
  },
  {
    id: 3,
    title: 'Fully whitelabel custom domain',
    sub_title: 'Available with Business Plan',
    domain_type: 'custom',
    look_like: 'www.tenantdomain.com/dashboard',
  },
];

type DomainFormProps = { tenantId: string; slug?: string };

function DomainForm({ tenantId, slug }: DomainFormProps) {
  const form = useForm<DomainType>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      tenant_id: tenantId,
      domain_type: 'path',
      value: '',
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = form;

  const domainType = watch('domain_type');

  useEffect(() => {
    if (domainType === 'path') {
      setValue('value', `www.mysaas.com/${slug}/`);
    } else if (domainType === 'subdomain') {
      setValue('value', `${slug}.mysaas.com/`);
    } else if (domainType === 'custom') {
      setValue('value', `www.${slug}.com/`);
    } else setValue('value', '');
  }, [domainType, setValue]);

  const onError = (errors: any) => {
    alert('Form validation failed: ' + JSON.stringify(errors, null, 2));
  };

  const onSubmit = (values: DomainType) => {
    alert(JSON.stringify(values, null, 2));
    console.log(values);
  };

  return (
    <div className="w-full p-4 border rounded-lg md:p-8 lg:p-12">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className={cn('grid grid-cols-1 gap-8', 'w-full mt-8 items-start')}
          autoComplete="off"
        >
          <div className="flex flex-col gap-4 border-b pb-4">
            {/* Tenant ID */}
            <FormField
              control={control}
              name="tenant_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tenant ID</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="domain_type"
            render={({ field }) => (
              <FormItem className="py-4">
                <FormLabel className="mb-4">Choose Your Domain</FormLabel>
                <FormControl>
                  <Choicebox value={field.value} onValueChange={field.onChange}>
                    {options.map((option) => (
                      <ChoiceboxItem key={option.id} value={option.domain_type}>
                        <ChoiceboxItemHeader>
                          <ChoiceboxItemTitle>
                            {option.title}{' '}
                            <ChoiceboxItemSubtitle>
                              {option.sub_title}
                            </ChoiceboxItemSubtitle>
                          </ChoiceboxItemTitle>
                          <ChoiceboxItemDescription className="italic">
                            Your domain will look like - {option.look_like}
                          </ChoiceboxItemDescription>
                        </ChoiceboxItemHeader>
                        <ChoiceboxItemContent>
                          <ChoiceboxItemIndicator />
                        </ChoiceboxItemContent>
                      </ChoiceboxItem>
                    ))}
                  </Choicebox>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-4 border-b pb-4">
            {/* Domain Value */}
            <FormField
              control={control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain Value</FormLabel>
                  <FormControl>
                    <Input {...field} readOnly />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Submit button */}
          <div className="col-span-1 flex mt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving Domain Inputs...' : 'Save Domain & Next'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default DomainForm;
