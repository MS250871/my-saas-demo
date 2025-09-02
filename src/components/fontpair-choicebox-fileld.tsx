'use client';

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
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { Label } from './ui/label';

export const FONT_PAIRS = [
  {
    label: 'Playfair Display + Source Sans 3',
    heading_font: {
      import: 'Playfair+Display',
      family: 'Playfair Display',
      type: 'serif',
    },
    paragraph_font: {
      import: 'Source+Sans+3',
      family: 'Source Sans 3',
      type: 'sans-serif',
    },
  },
  {
    label: 'Merriweather + Merriweather Sans',
    heading_font: {
      import: 'Merriweather',
      family: 'Merriweather',
      type: 'serif',
    },
    paragraph_font: {
      import: 'Merriweather+Sans',
      family: 'Merriweather Sans',
      type: 'sans-serif',
    },
  },
  {
    label: 'Lora + Roboto',
    heading_font: {
      import: 'Lora',
      family: 'Lora',
      type: 'serif',
    },
    paragraph_font: {
      import: 'Roboto',
      family: 'Roboto',
      type: 'sans-serif',
    },
  },
  {
    label: 'Libre Baskerville + Nunito',
    heading_font: {
      import: 'Libre+Baskerville',
      family: 'Libre Baskerville',
      type: 'serif',
    },
    paragraph_font: {
      import: 'Nunito',
      family: 'Nunito',
      type: 'sans-serif',
    },
  },
  {
    label: 'Roboto Slab + Roboto',
    heading_font: {
      import: 'Roboto+Slab',
      family: 'Roboto Slab',
      type: 'serif',
    },
    paragraph_font: {
      import: 'Roboto',
      family: 'Roboto',
      type: 'sans-serif',
    },
  },
  {
    label: 'Abril Fatface + Poppins',
    heading_font: {
      import: 'Abril+Fatface',
      family: 'Abril Fatface',
      type: 'display',
    },
    paragraph_font: {
      import: 'Poppins',
      family: 'Poppins',
      type: 'sans-serif',
    },
  },
  {
    label: 'Montserrat + Montserrat',
    heading_font: {
      import: 'Montserrat',
      family: 'Montserrat',
      type: 'sans-serif',
    },
    paragraph_font: {
      import: 'Montserrat',
      family: 'Montserrat',
      type: 'sans-serif',
    },
  },
  {
    label: 'Poppins + Lato',
    heading_font: {
      import: 'Poppins',
      family: 'Poppins',
      type: 'sans-serif',
    },
    paragraph_font: {
      import: 'Lato',
      family: 'Lato',
      type: 'sans-serif',
    },
  },
  {
    label: 'Inter + Inter',
    heading_font: {
      import: 'Inter',
      family: 'Inter',
      type: 'sans-serif',
    },
    paragraph_font: {
      import: 'Inter',
      family: 'Inter',
      type: 'sans-serif',
    },
  },
  {
    label: 'Source Sans 3 + Source Serif 4',
    heading_font: {
      import: 'Source+Sans+3',
      family: 'Source Sans 3',
      type: 'sans-serif',
    },
    paragraph_font: {
      import: 'Source+Serif+4',
      family: 'Source Serif 4',
      type: 'serif',
    },
  },
];
// Utility function to create value string for storing both fonts
const fontPairValue = (heading: string, paragraph: string) =>
  `${heading}::${paragraph}`;

// Usage inside your form (with RHF FormField)
export function FontPairChoiceboxField() {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name="font_pair"
      render={({ field }) => (
        <FormItem className="py-4">
          <FormLabel className="mb-4">Choose Font Pair</FormLabel>

          <FormControl>
            <Choicebox
              value={field.value}
              onValueChange={field.onChange}
              className="grid grid-cols-2 gap-x-4 gap-y-6 items-stretch"
            >
              {FONT_PAIRS.map((pair) => (
                <div
                  key={pair.label}
                  className="flex flex-col items-start gap-3"
                >
                  <Label className="text-foreground/50">{pair.label}</Label>
                  <ChoiceboxItem
                    className="w-full h-full"
                    value={fontPairValue(
                      pair.heading_font.family,
                      pair.paragraph_font.family
                    )}
                  >
                    <ChoiceboxItemHeader>
                      <ChoiceboxItemTitle>
                        {' '}
                        <div
                          style={{
                            fontFamily: `"${pair.heading_font.family}", ${pair.heading_font.type}`,
                            fontSize: '24px',
                            marginBottom: 6,
                          }}
                        >
                          Acme cloud
                        </div>
                      </ChoiceboxItemTitle>
                      <ChoiceboxItemDescription>
                        <div
                          style={{
                            fontFamily: `"${pair.paragraph_font.family}", ${pair.paragraph_font.type}`,
                            fontSize: '14px',
                          }}
                        >
                          Acme Cloud helps your business collaborate and
                          automate workflows with ease. Experience the next
                          generation of productivity and support—tailored for
                          startups and enterprises alike.
                        </div>
                      </ChoiceboxItemDescription>
                    </ChoiceboxItemHeader>

                    <ChoiceboxItemContent>
                      <ChoiceboxItemIndicator />
                    </ChoiceboxItemContent>
                  </ChoiceboxItem>
                </div>
              ))}
            </Choicebox>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
