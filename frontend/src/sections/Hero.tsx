
export const Hero = () => {

    const stats = [
        { name: "Animals Rescued", value: "540+"},
        { name: "Partner Clinics", value: "40+"},
        { name: "Adoption Success", value: "95%"},
    ]

    return (
        <section
            id="hero-id"
            className="flex min-h-dvh w-full px-6 py-5 lg:py-16"
        >
            <div className="mx-auto grid max-w-7xl items-center lg:grid-cols-2">
                
                <div className="max-w-xl">
                    <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                    Pro Animal <span className="text-btn-black-bg">Welfare System</span>
                    </h1>

                    <p className="mt-8 line-clamp-2 text-base leading-7 tracking-wide text-text-body sm:text-lg">
                    Connect pet owners with trusted veterinary care, rescue support, and essential pet services.
                    </p>

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
    );
};