import { z } from 'zod';

export const domainSchema = z.object({
  tenant_id: z.uuid(),
  domain_type: z.enum(['path', 'subdomain', 'custom']),
  value: z.string().optional(),
});

export type DomainType = z.infer<typeof domainSchema>;
