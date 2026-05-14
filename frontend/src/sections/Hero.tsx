import { Link } from 'react-router-dom'
import { Button } from '../ui/form/Buttons';

export const Hero = () => {

    const stats = [
        { name: "Animals Rescued", value: "540+"},
        { name: "Partner Clinics", value: "40+"},
        { name: "Adoption Success", value: "95%"},
    ]

    const links = [
        { name: "Appointment", path: "/appointment" },
        { name: "Products", path: "/product-overview" },
    ]

    return (
        <section
            id="hero-id"
            className="w-full px-6 py-10 lg:px-12 lg:py-16"
        >
            <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
                
                <div className="max-w-xl">
                    <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
                        Pro Animal Welfare System
                    </h1>

                    <p className="mt-8 max-w-md text-base leading-7 text-gray-500 sm:text-lg">
                        Create responsive and beautiful user interfaces using
                        React, TypeScript, and Tailwind CSS.
                    </p>

                    <div className="mt-10 flex flex-wrap items-center gap-4">
                        {links.map(li => (
                            <Link
                                key={li.name}
                                to={li.path}
                                className="rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:opacity-90"
                            >
                                {li.name}
                            </Link>
                        ))}
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

                <div className="relative h-[800px] w-full overflow-hidden hidden lg:block">
                <div
                    className="absolute inset-0 bg-[url(/img/vet-bg.webp)] bg-cover bg-center
                    filter brightness-75 contrast-110 blur-[0px]
                    [mask-image:url(/img/55.png),linear-gradient(black,black)]
                    [mask-composite:exclude]
                    [mask-size:cover]
                    [mask-position:center]
                    [mask-repeat:no-repeat]"
                />
                </div>
            </div>
        </section>
    );
};