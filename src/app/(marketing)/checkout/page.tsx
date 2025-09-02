type PaymentPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const PaymentPage = async ({ searchParams }: PaymentPageProps) => {
  const resolvedSearchParams = await searchParams;
  const subscription = resolvedSearchParams.subscription;
  // Use resolvedSearchParams as needed
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      PaymentPage: {subscription}
    </section>
  );
};

export default PaymentPage;
