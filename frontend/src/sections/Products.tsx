import { useInView } from '../hooks/useInView'
import { Cross, Activity, Salad, HandFist } from 'lucide-react'

const Products = () => {

  const { ref, inView } = useInView();

  const offers = [
    { name: "Care", icon: <Cross className="w-10 h-10" /> },
    { name: "Health", icon: <Activity className="w-10 h-10" /> },
    { name: "Nutrition", icon: <Salad className="w-10 h-10" /> },
    { name: "Support", icon: <HandFist className="w-10 h-10" /> },
  ]

  return (
    <article
      ref={ref}
      id="product-id"
      className="flex items-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        <div
          className={`
            transform-gpu transition-all duration-700
            ease-[cubic-bezier(0.16,1,0.3,1)]
            will-change-transform will-change-opacity
            ${
              inView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-6'
            }
          `}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Veterinary Products <br /> <span className="text-btn-black-bg">You Can Trust</span>
          </h2>

          <p className="text-lg text-text-body leading-7 tracking-wide mb-8">
            Shop trusted veterinary products for animal care, health, and nutrition.
            Visit our online overview to explore more.
          </p>
        </div>

        <div
          className={`
            relative transform-gpu transition-all duration-[2000ms]
            ease-[cubic-bezier(0.16,1,0.3,1)]
            will-change-transform will-change-opacity
            ${
              inView
                ? 'opacity-100 translate-x-0 scale-100'
                : 'opacity-0 translate-x-6 scale-[0.98]'
            }
          `}
        >
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">

            <div className="grid grid-cols-2 gap-6">
              {offers.map(o => (
                <div key={o.name} className={`h-32 rounded-2xl bg-surface-muted/10 flex items-center justify-center text-text-hover font-semibold`}>
                  {o.icon}
                </div>
              ))}
            </div>

            <p className="text-sm text-text-body mt-6 text-center">
              Trusted products for better animal wellness.
            </p>
          </div>
        </div>

      </div>
    </article>
  );
};

export default Products;