import { Input } from '../ui/form/Input'
import { useInView } from '../hooks/useInView'

const companyLinks = [
  { name: "Appointment", path: "/appointment" },
  { name: "Products", path: "/product-overview" },
]

const helpLinks = [
  { name: "Home", path: "/#hero-id" },
  { name: "About", path: "/#about-id" }
];

export const Footer = () => {

  const ref = useInView()

  return (
    <footer ref={ref} id="contact-id" className="bg-footer-bg text-white px-10 py-12">
      <div className="max-w-7xl mx-auto">

        <div className="grid md:grid-cols-2 gap-10">

          <div>
            <h2 className="text-4xl font-semibold leading-tight">
              Smart Veterinary Care
              <br />
              & Pet Management System
            </h2>

            <p className="text-gray-300 mt-4 max-w-xl">
              Pro Animal Welfare System helps veterinary clinics manage
              appointments, upload pet care products, and streamline animal
              healthcare services in one platform.
            </p>
          </div>

          <div className="md:text-right">
            <h3 className="text-2xl font-medium mb-4">
              Get In Touch!
            </h3>

            <div className="w-full max-w-md md:ml-auto border border-gray-500 rounded-full overflow-hidden">
              <Input
                placeholder="Enter your email"
                className="w-full bg-transparent border-none px-5 py-3 text-white placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-10 mt-16">

          <div>
            <h4 className="text-sm text-gray-400 font-semibold uppercase mb-5">
              Contact Information
            </h4>

            <div className="space-y-3 text-gray-200">
              <p>proanimalw@gmail.com</p>
              <p>1800-3232-8686</p>
            </div>
          </div>

          <div>
            <h4 className="text-sm text-gray-400 font-semibold uppercase mb-5">
              Features
            </h4>

            <ul className="space-y-3 text-gray-200">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.path}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm text-gray-400 font-semibold uppercase mb-5">
              Help
            </h4>

            <ul className="space-y-3 text-gray-200">
              {helpLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.path}>{link.name}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm text-gray-400 font-semibold uppercase mb-5">
              Follow Us
            </h4>

            <div className="flex gap-4">
              <div className="w-11 h-11 rounded-full bg-white" />
              <div className="w-11 h-11 rounded-full bg-white" />
              <div className="w-11 h-11 rounded-full bg-white" />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-14 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          
          <p>© 2025 Hanz Menzi. All Rights Reserved.</p>

          <div className="flex gap-8">
            <p>Privacy</p>
            <p>Terms & Conditions</p>
          </div>
        </div>

      </div>
    </footer>
  );
};