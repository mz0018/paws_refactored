import { Star, PawPrint, HeartHandshake } from "lucide-react";

export const About = () => {
  const features = [
    {
      id: "01",
      title: "Online Appointment",
      description:
        "With years of experience, our dedicated animal welfare team ensures rescued animals receive proper care, love, and protection.",
      color: "bg-[#FFB162]",
      icon: HeartHandshake,
    },
    {
      id: "02",
      title: "View veterinary products",
      description:
        "We believe every animal deserves personalized attention, medical support, and a safe environment suited to their needs.",
      color: "bg-[#A35139]",
      icon: PawPrint,
    },
    {
      id: "03",
      title: "Safety and Quality",
      description:
        "Animal safety and wellbeing are at the heart of everything we do. We follow the highest welfare and care standards.",
      color: "bg-[#C9C1B1]",
      icon: Star,
    },
  ];

  return (
    <section id="about-id" className="py-20 px-6 bg-[#faf7f2]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.3em] text-sm text-[#A35139] mb-3">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Caring for Animals With Compassion
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ id, title, description, color, icon: Icon }) => (
            <div
              key={id}
              className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition"
            >
              <span className="absolute top-5 right-5 text-4xl font-bold text-gray-100">
                {id}
              </span>

              <div
                className={`w-14 h-14 ${color} rounded-xl flex items-center justify-center text-white mb-6`}
              >
                <Icon size={26} />
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {title}
              </h3>

              <p className="text-gray-600 leading-relaxed text-sm">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};