import { useInView } from '../hooks/useInView';

export const About = () => {
  const { ref } = useInView();

  return (
    <section
      ref={ref}
      id="about-id"
      className="py-20 px-6 min-h-screen flex items-center"
    >
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-text-hover mb-4">
          About Us
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Trusted Veterinary Care & Services
        </h2>

        <p className="text-lg text-text-body leading-relaxed mb-6">
          We are committed to providing reliable veterinary care, trusted products,
          and convenient services that support the health and well-being of animals.
        </p>

        <p className="text-lg text-text-body leading-relaxed">
          From appointment scheduling to veterinary essentials, our goal is to make
          animal care more accessible, simple, and dependable for every pet owner.
        </p>
      </div>
    </section>
  );
};