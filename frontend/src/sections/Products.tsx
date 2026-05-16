import { useInView } from '../hooks/useInView'
import { Button } from '../ui/form/Buttons'
import { ShoppingBasket } from 'lucide-react'

const Products = () => {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      id="product-id"
      className="min-h-screen flex items-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
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
            Veterinary Products <br /> You Can Trust
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
            saepe, repellendus aperiam adipisci at blanditiis corrupti
            necessitatibus in doloremque.
          </p>

          <Button
            onClick={() => (window.location.href = "/product-overview")}
            className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-btn-black-bg text-white hover:bg-btn-black-hover-header-bg transition duration-300"
          >
            <ShoppingBasket className="w-5 h-5" />
            <span>Visit Vet Products</span>
          </Button>
        </div>

        {/* Right Card */}
        <div
          className={`
            relative transform-gpu transition-all duration-1000
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
              <div className="h-32 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                Care
              </div>

              <div className="h-32 rounded-2xl bg-blue-200 flex items-center justify-center text-blue-800 font-semibold">
                Health
              </div>

              <div className="h-32 rounded-2xl bg-blue-300 flex items-center justify-center text-blue-900 font-semibold">
                Nutrition
              </div>

              <div className="h-32 rounded-2xl bg-blue-400 flex items-center justify-center text-white font-semibold">
                Support
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-6 text-center">
              Lorem ipsum placeholder product categories overview
            </p>
          </div>
        </div>

      </div>
    </article>
  );
};

export default Products;