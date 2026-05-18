import { useInView } from '../hooks/useInView';
import { Button } from '../ui/form/Buttons';
import { CalendarRange } from 'lucide-react';

const Appointments = () => {
  const { ref, inView } = useInView();

  return (
    <article
      ref={ref}
      id="appointment-id"
      className="min-h-screen flex items-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

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
            Book Appointments <br /> <span className="text-btn-black-bg">In Minutes</span>
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit, perspiciatis. Velit consequatur molestiae
            laboriosam autem pariatur nemo doloremque.
          </p>

          <Button
            onClick={() => (window.location.href = "/appointment")}
            className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-btn-black-bg text-white hover:bg-btn-black-hover-header-bg transition duration-300"
          >
            <CalendarRange className="w-5 h-5" />
            <span>Start an Appointment</span>
          </Button>
        </div>

        {/* Right Feature Card */}
        <div
          className={`
            bg-white rounded-3xl p-8 shadow-xl border border-gray-100
            transform-gpu transition-all duration-1000
            ease-[cubic-bezier(0.16,1,0.3,1)]
            will-change-transform will-change-opacity
            ${
              inView
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-6'
            }
          `}
        >
          <div className="space-y-6">

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-bold">
                01
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Quick Scheduling
                </h3>

                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Doloremque, illum.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-bold">
                02
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Flexible Time Slots
                </h3>

                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Officiis, asperiores.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center font-bold">
                03
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Smooth Experience
                </h3>

                <p className="text-gray-600">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus, rerum.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </article>
  );
};

export default Appointments;