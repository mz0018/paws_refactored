import { useInView } from '../hooks/useInView';

export const About = () => {
  const { ref } = useInView();

  return (
    <>
      <div className="h-18" id="about-id" />
      <section
        ref={ref}
        id="about-id"
        className="py-20 px-6 flex items-center"
      >
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-text-hover mb-4">
            About Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Pet Care Made Simple
          </h2>

          <p className="text-lg text-text-body leading-relaxed mb-6">
            Find veterinary services, adoption resources, rescue support, and pet care information—all in one place.
          </p>

          <p className="text-lg text-text-body leading-relaxed">
            Helping pet owners access the resources they need for happier, healthier pets.
          </p>
        </div>
      </section>
    </>
  );
};