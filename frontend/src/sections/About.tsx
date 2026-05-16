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
        <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">
          About Us
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Crafting Meaningful Digital Experiences
        </h2>

        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
          ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>

        <p className="text-lg text-gray-700 leading-relaxed">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
          non proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>
    </section>
  );
};