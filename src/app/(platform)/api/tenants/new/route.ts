import { getServerClient } from '@/utils/supabase/getServerClient';
import slugify from 'slugify';
import { NextResponse } from 'next/server';
import { CompanyOrgSchema } from '@/lib/validations/companySchema';
import { no } from 'zod/v4/locales';

export async function POST(req: Request) {
  const supabase = await getServerClient();
  //get tenant data
  const body = await req.json();
  //add slug
  const bodyWithSlug = {
    ...body,
    slug: slugify(body.company_name, { lower: true, strict: true }),
  };
  // validate data, on error send validation errors
  const result = CompanyOrgSchema.safeParse(bodyWithSlug);
  if (!result.success) {
    const errors: { [key: string]: string } = {};
    for (const issue of result.error.issues) {
      const key = (issue.path[0] as string) || 'form';
      if (!errors[key]) errors[key] = issue.message;
    }
    return NextResponse.json({ error: errors }, { status: 400 });
  }

  const newTenant = {
    owner_id: bodyWithSlug.owner_id,
    company_name: bodyWithSlug.company_name,
    slug: bodyWithSlug.slug,
    company_email: bodyWithSlug.company_email,
    company_mobile: bodyWithSlug.company_mobile,
    company_website: bodyWithSlug.company_website,
    company_address_1: bodyWithSlug.company_address_1,
    company_address_2: bodyWithSlug.company_address_2,
    country: bodyWithSlug.country.id,
    state: bodyWithSlug.state.id,
    city: bodyWithSlug.city.id,
    postal_code: bodyWithSlug.postal_code,
    company_type: bodyWithSlug.company_type,
    no_of_employees: bodyWithSlug.no_of_employees,
  };
  // insert data
  const { data, error } = await supabase
    .from('tenants')
    .insert(newTenant)
    .select();
  // on error send error message
  if (error) {
    console.log('insert error from supabase:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }

  return NextResponse.json({ tenant: data[0] }, { status: 201 });
}
