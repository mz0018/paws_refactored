import { MousePointer2 } from 'lucide-react'

export const Hero = () => {

    const stats = [
        { name: "Animals Rescued", value: "540+"},
        { name: "Products", value: "120+" },
        { name: "Adoption Success", value: "95%"},
    ]

    return (
        <>
        <div className="h-18" id="hero-id" />
        <section
            
            className="flex w-full px-6 py-16"
        >
            <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-2">
                
                <div className="max-w-xl">
                    <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                    Pro Animal <span className="text-btn-black-bg">Welfare System</span>
                    </h1>

                    <p className="mt-8 line-clamp-2 text-base leading-7 tracking-wide text-text-body sm:text-lg">
                        Connecting pet owners with veterinary care, rescue support, and pet resources.
                    </p>

                    <div className="block md:hidden">
                        <a
                        href="/signin"
                        className="flex w-1/2 items-center justify-center bg-btn-black-bg hover:bg-btn-black-hover-header-bg text-white px-6 py-4 rounded-sm text-[15px] font-medium transition-all duration-200 mt-4"
                        >
                        <MousePointer2 className="rotate-90 w-4 h-4" />
                        &emsp;Get Started
                        </a>
                    </div>

                    <div className="mt-16 flex flex-wrap gap-10 sm:gap-16">

                        {stats.map(st => (
                            <div key={st.name}>
                                <h3 className="text-4xl font-semibold text-gray-900">
                                    {st.value}
                                </h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    {st.name}
                                </p>
                            </div>
                        ))}

                    </div>
                </div>

                <div className="hidden h-[450px] w-full overflow-hidden rounded-md shadow-2xl shadow-black/30 lg:block">
                    <img
                        src="/img/main.webp"
                        alt=""
                        className="h-full w-full object-cover"
                    />
                </div>
            </div>
        </section>
        </>
    );
};