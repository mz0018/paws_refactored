import { MousePointer2 } from 'lucide-react'

export const Hero = () => {

    return (
        <>
        <div className="h-18" id="hero-id" />
        <section
            
            className="flex w-full px-6 py-16"
        >
            <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-2 gap-12">
                
                <div className="max-w-xl">
                    <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                    Pro Animal <span className="text-btn-black-bg">Welfare System</span>
                    </h1>

                    <p className="mt-8 text-base leading-7 tracking-wide text-text-body sm:text-lg">
                    Online vet appointments, pet products, and clinic management—all in one
                    convenient platform for you and your pets.
                    </p>

                    <div className="">
                        <a
                        href="/appointment"
                        className="flex w-1/2 items-center justify-center bg-btn-black-bg hover:bg-btn-black-hover-header-bg text-white px-6 py-4 rounded-sm text-[15px] font-medium transition-all duration-200 mt-4"
                        >
                        <MousePointer2 className="rotate-90 w-4 h-4" />
                        &emsp;Get Started
                        </a>
                    </div>

                </div>

                <div className="relative hidden h-[450px] w-full overflow-hidden rounded-md lg:block">
                <img
                    src="/img/main.webp"
                    alt=""
                    className="h-full w-full object-cover border-2 border-gray-200 rounded-md"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-text-body via-btn-black-bg/20 to-transparent" />

                </div>
            </div>
        </section>
        </>
    );
};