import { Star, PawPrint, HeartHandshake } from 'lucide-react'

export const About = () => {
  const features = [
    {
      id: "01",
      title: "Online Appointment",
      description:
        "With years of experience, our dedicated animal welfare team ensures rescued animals receive proper care, love, and protection.",
      color: "bg-[#FFB162]",
      icon: <HeartHandshake />,
    },
    {
      id: "02",
      title: "View veterinary products",
      description:
        "We believe every animal deserves personalized attention, medical support, and a safe environment suited to their needs.",
      color: "bg-[#A35139]",
      icon: <PawPrint />,
    },
    {
      id: "03",
      title: "Safety and Quality",
      description:
        "Animal safety and wellbeing are at the heart of everything we do. We follow the highest welfare and care standards.",
      color: "bg-[#C9C1B1]",
      icon: <Star />,
    },
  ];

  return (
    <section id="about-id" className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        
        <p className="uppercase tracking-[0.4em] text-sm text-gray-500 mb-4">
          Why Choose Us
        </p>

        <h2 className="text-5xl font-bold text-gray-900 mb-20">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
          {features.map((feature) => (
            <div key={feature.id} className="relative">
              
              <span className="absolute -top-2 right-0 text-gray-700 text-lg font-medium">
                {feature.id}
              </span>

              <div
                className={`w-16 h-16 ${feature.color} rounded-lg flex items-center justify-center text-white text-2xl shadow-md mb-6`}
              >
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};