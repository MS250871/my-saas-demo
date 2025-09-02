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
  SHADE_LABELS,
  brandingSchema,
  BrandingFormValues,
} from '@/lib/validations/brandingSchema';
import {
  FONT_PAIRS,
  FontPairChoiceboxField,
} from './fontpair-choicebox-fileld';
import { generateShadesChromaJs } from '@/lib/generateShadesChromaJs';
import { ColorInput } from './color-input';
import { FileUpload, UploadedFileInfo } from './file-upload';
import { Switch } from './ui/switch';

type BrandingFormProps = { tenantId: string };

export function BrandingForm({ tenantId }: BrandingFormProps) {
  // Local state for logo file and error
  const [logos, setLogos] = useState<UploadedFileInfo[]>([]);
  const [deletingLogo, setDeletingLogo] = useState<boolean[]>([]);
  const [logoUploadError, setLogoUploadError] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  // Color shade state
  const [primaryShades, setPrimaryShades] = useState<string[]>(
    generateShadesChromaJs('#0A83f5')
  );
  const [secondaryShades, setSecondaryShades] = useState<string[]>(
    generateShadesChromaJs('#f57c08')
  );

  // Main form for branding
  const form = useForm<BrandingFormValues>({
    resolver: zodResolver(brandingSchema),
    defaultValues: {
      tenantId: tenantId ?? '',
      isRectangular: true,
      logoUrl: [],
      // Default Tailwind Indigo and Orange
      primary_50: primaryShades[0],
      primary_100: primaryShades[1],
      primary_200: primaryShades[2],
      primary_300: primaryShades[3],
      primary_400: primaryShades[4],
      primary_500: primaryShades[5],
      primary_600: primaryShades[6],
      primary_700: primaryShades[7],
      primary_800: primaryShades[8],
      primary_900: primaryShades[9],
      primary_950: primaryShades[10],
      secondary_50: secondaryShades[0],
      secondary_100: secondaryShades[1],
      secondary_200: secondaryShades[2],
      secondary_300: secondaryShades[3],
      secondary_400: secondaryShades[4],
      secondary_500: secondaryShades[5],
      secondary_600: secondaryShades[6],
      secondary_700: secondaryShades[7],
      secondary_800: secondaryShades[8],
      secondary_900: secondaryShades[9],
      secondary_950: secondaryShades[10],
      title_font: FONT_PAIRS[0].heading_font.family,
      paragraph_font: FONT_PAIRS[0].paragraph_font.family,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setValue,
    watch,
  } = form;

  // Watch 500 shades for auto-update
  useEffect(() => {
    const shades = generateShadesChromaJs(watch('primary_500'));
    SHADE_LABELS.forEach((label, idx) => {
      setValue(`primary_${label}` as keyof BrandingFormValues, shades[idx]);
    });
    setPrimaryShades(shades);
    // eslint-disable-next-line
  }, [watch('primary_500')]);

  useEffect(() => {
    const shades = generateShadesChromaJs(watch('secondary_500'));
    SHADE_LABELS.forEach((label, idx) => {
      setValue(`secondary_${label}` as keyof BrandingFormValues, shades[idx]);
    });
    setSecondaryShades(shades);
    // eslint-disable-next-line
  }, [watch('secondary_500')]);

  // Sync logoUrl in form state when logos change
  useEffect(() => {
    setValue(
      'logoUrl',
      logos.map((l) => l.url),
      { shouldValidate: true }
    );
  }, [logos, setValue]);

  // File upload handlers
  const handleLogoUpload = async (newFiles: File[]) => {
    setLogoUploadError([]);
    setUploading(true);
    return new Promise<UploadedFileInfo[]>((resolve) => {
      setTimeout(() => {
        const uploaded = newFiles.map((fileObj) => ({
          url: URL.createObjectURL(fileObj),
          type: fileObj.type,
          name: fileObj.name,
          size: fileObj.size,
        }));
        setLogos((prev) => [...prev, ...uploaded]);
        setDeletingLogo((prev) => [
          ...prev,
          ...new Array(uploaded.length).fill(false),
        ]);
        setUploading(false);
        resolve(uploaded);
      }, 1000);
    });
  };

  const handleLogoDelete = (idx: number) => {
    setDeletingLogo((prev) => prev.map((v, i) => (i === idx ? true : v)));
    setTimeout(() => {
      setLogos((prev) => prev.filter((_, i) => i !== idx));
      setDeletingLogo((prev) => prev.filter((_, i) => i !== idx));
    }, 1000);
  };

  const onError = (errors: any) => {
    alert('Form validation failed: ' + JSON.stringify(errors, null, 2));
  };

  const onSubmit = (values: BrandingFormValues) => {
    alert(JSON.stringify(values, null, 2));
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
              name="tenantId"
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

          <div className="flex flex-col gap-4 border-b py-4">
            <FormField
              control={form.control}
              name="isRectangular"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5 flex flex-col gap-2">
                    <FormLabel>Is Rectangular</FormLabel>
                    <FormDescription>
                      Rectangular, means aspect ratio of 3:1 (width: height)
                      otherwise we use 1:1 (Square).
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FileUpload
              accept={{
                'image/png': [],
                'image/jpeg': [],
                'image/svg+xml': [],
                'image/webp': [],
              }}
              maxFiles={1}
              maxSize={1 * 1024 * 1024}
              minSize={1 * 1024}
              handleUpload={handleLogoUpload}
              files={logos}
              deleting={deletingLogo}
              onDelete={handleLogoDelete}
              disabled={uploading}
              loading={uploading}
              error={logoUploadError}
              label="Upload Logo File"
              imageWidth={120}
              imageHeight={40}
              imageFit="contain"
              aspectRatio="4 / 1"
              imageClassName="object-cover"
            />
          </div>

          <div className="flex flex-col gap-4 border-b py-4">
            {' '}
            {/* Primary Color */}
            <ColorInput
              label="Primary"
              name="primary_500"
              control={control}
              value={watch('primary_500')}
              shades={primaryShades}
              onChange={(val) => {
                setValue('primary_500', val, { shouldValidate: true });
              }}
              shadeLabels={SHADE_LABELS}
            />
            {/* Secondary Color */}
            <ColorInput
              label="Secondary"
              name="secondary_500"
              control={control}
              value={watch('secondary_500')}
              shades={secondaryShades}
              onChange={(val) => {
                setValue('secondary_500', val, { shouldValidate: true });
              }}
              shadeLabels={SHADE_LABELS}
            />
          </div>

          <FontPairChoiceboxField />

          {/* Submit button */}
          <div className="col-span-1 flex mt-4">
            <Button type="submit" disabled={isSubmitting || uploading}>
              {isSubmitting
                ? 'Saving Brand Inputs...'
                : 'Save Brand Inputs & Next'}
            </Button>
          </div>
        </form>
      </Form>
      {/* Google Fonts Link tags */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Arvo:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Merriweather+Sans:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Varela+Round:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Varela:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Avro:wght@400;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
      `}</style>
    </div>
  );
}
