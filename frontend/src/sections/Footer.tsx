import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView'
import { FaFacebookF, FaGithub, FaLinkedinIn } from 'react-icons/fa'

const companyLinks = [
  { name: "Appointment", path: "/appointment" },
  { name: "Products", path: "/product-overview" },
]

const follow = [
  {
    name: "Facebook",
    icon: FaFacebookF,
    url: "https://www.facebook.com/HnzMnzMrtnz/",
  },
  {
    name: "GitHub",
    icon: FaGithub,
    url: "https://github.com/mz0018",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedinIn,
    url: "https://www.linkedin.com/in/hanz-menzi-martinez-b9079b320/",
  },
];

export const Footer = () => {

  const { ref } = useInView()

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

              <p className="mt-4 max-w-xl text-gray-300">
                Pro Animal Welfare System makes it easy to book veterinary appointments,
                browse pet care products, and access quality healthcare services for your pets
                in one convenient platform.
              </p>
            </div>

          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 mt-16">

            <div>
              <h4 className="text-sm text-gray-400 font-semibold uppercase mb-5">
                Contact Information
              </h4>

              <div className="space-y-3 text-gray-200">
                <p>proanimalw@gmail.com</p>
                <p>+639 38736 4065</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm text-gray-400 font-semibold uppercase mb-5">
                Features
              </h4>

              <ul className="space-y-3 text-gray-200">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <Link to={link.path}>{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm text-gray-400 font-semibold uppercase mb-5">
                Follow ME
              </h4>

              <div className="flex gap-4">
                {follow.map((social) => {
                  const Icon = social.icon;

                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.name}
                      className="
                        flex h-11 w-11 items-center justify-center
                        rounded-full bg-white
                        text-footer-bg
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:bg-btn-black-bg
                        hover:text-white
                      "
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
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
