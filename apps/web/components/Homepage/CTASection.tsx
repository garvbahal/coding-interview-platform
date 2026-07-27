export const CTASection = () => {
  return (
    <section className="bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Ready to standardize your interviews?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">
          Set up your first virtual room within minutes. Create test cases,
          invite candidates, and hire better.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="signup.html"
            className="rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black hover:bg-gray-100 transition-colors shadow-xl hover:scale-105 transition-transform duration-200"
          >
            Create an account for free
          </a>
        </div>
      </div>
    </section>
  );
};
