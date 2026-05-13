import { Link } from 'react-router-dom'

export const Hero = () => {
    return (
        <section id="hero-id" className="py-20 px-6">
            <div className="max-w-5xl mx-auto text-center">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    Pro Animal Welfare System
                </h1>

                <p className="text-lg text-gray-600 mb-8">
                    Create responsive and beautiful user interfaces using
                    React, TypeScript, and Tailwind CSS.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/appointment"
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
                    >
                        Appointment
                    </Link>

                    <Link
                        to="/product-overview"
                        className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-200 transition"
                    >
                        Products
                    </Link>
                </div>
            </div>
        </section>
    );
};