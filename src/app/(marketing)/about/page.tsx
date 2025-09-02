type Statistic = {
  value: number;
  label: string;
};

const statistics: Statistic[] = [
  {
    value: 44000,
    label: 'Transactions per day',
  },
  {
    value: 8000,
    label: 'Properties Listed',
  },
  {
    value: 300,
    label: 'New Users Daily',
  },
];

function AboutPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold text-foreground">
            Just A Sample
          </h2>
          <p className="mt-2 text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            We are changing the way people manage group travel
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-gray-700 dark:text-gray-300 sm:text-xl">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis
          earum quaerat aliquam officiis repellat dolores natus consectetur
          beatae recusandae, quam, nemo eius pariatur? A nemo odit quibusdam.
        </p>
      </section>
      <section className="relative isolate overflow-hidden px-6 pt-6 pb-12 lg:pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl flex flex-col items-start gap-12 ">
          <h2 className="text-5xl font-bold text-foreground sm:text-6xl">
            Our Mission
          </h2>
          <div className="w-full flex flex-col lg:flex-row items-start gap-12 lg:gap-24">
            <div className="w-4/6 flex flex-col items-start">
              <p className=" max-w-2xl text-xl text-foreground sm:text-2xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sapiente neque architecto commodi labore, ullam animi atque
                nesciunt facere doloremque, magni ex vero quos vitae libero
                repudiandae numquam, corrupti odio cupiditate cum quisquam? Nam
                maiores aspernatur debitis harum? Libero, adipisci tempore.
              </p>
              <p className="mt-6 max-w-2xl text-xl text-gray-500 dark:text-gray-400 sm:text-2xl">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Corporis earum quaerat aliquam officiis repellat dolores natus
                consectetur beatae recusandae, quam, nemo eius pariatur? A nemo
                odit quibusdam.
              </p>
            </div>
            <ul className="w-2/6 flex flex-col items-start gap-10">
              {statistics.map((stat) => (
                <li key={stat.label}>
                  <span className="text-4xl font-bold text-foreground lg:text-5xl">
                    {stat.value}
                  </span>{' '}
                  <p className="text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}

export default AboutPage;
