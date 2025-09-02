import { z } from 'zod';

export const companyTypes = [
  { label: 'Proprietorship', value: 'proprietorship' },
  { label: 'Partnership', value: 'partnership' },
  { label: 'Private Ltd', value: 'private_ltd' },
  { label: 'Public Ltd', value: 'public_ltd' },
];

export const employees = [
  { label: '1 to 10', value: '1 to 10' },
  { label: '11 to 50', value: '11 to 50' },
  { label: '51 to 200', value: '51 to 200' },
  { label: '201 to 500', value: '201 to 500' },
  { label: '500+', value: '500+' },
];

export const CompanyOrgSchema = z.object({
  owner_id: z.string().min(1, 'Owner is required'),
  company_name: z.string().min(2, 'Company name required'),
  slug: z.string().optional(),
  company_email: z.string().email('Invalid email'),
  company_mobile: z.string().min(8, 'Mobile required'),
  company_website: z.string().regex(/^www\./, 'Website should start with www'),
  company_address_1: z.string().min(2, 'Address required'),
  company_address_2: z.string().optional(),
  country: z.object({ id: z.number(), name: z.string() }),
  state: z.object({ id: z.number(), name: z.string() }),
  city: z.object({ id: z.number(), name: z.string() }),
  postal_code: z.string().min(2, 'Postal code required'),
  company_type: z.enum(companyTypes.map((type) => type.value)),
  no_of_employees: z.enum(employees.map((emp) => emp.value)),
});

export type CompanyOrgType = z.infer<typeof CompanyOrgSchema>;
