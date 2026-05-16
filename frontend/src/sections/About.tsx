import { useInView } from '../hooks/useInView';

export const About = () => {
  const { ref } = useInView()
  

  return (
    <section ref={ref} id="about-id" className="py-20 px-6 bg-[#faf7f2] min-h-screen">
      <>
        about us
      </>
    </section>
  );
};
