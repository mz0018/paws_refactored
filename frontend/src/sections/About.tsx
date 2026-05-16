import { useInView } from '../hooks/useInView';

const About = () => {
  const { ref, inView } = useInView()
  

  return (
    <section ref={ref} id="about-id" className="py-20 px-6 bg-[#faf7f2] min-h-screen">
      {inView && (
        <>
          about us
        </>
      )}
    </section>
  );
};

export default About