import { z } from 'zod';

export const pricingSchema = z.object({
  tenant_id: z.uuid(),
  plan_id: z.number().min(1, 'Please select a plan'),
});
export type PricingFormData = z.infer<typeof pricingSchema>;
