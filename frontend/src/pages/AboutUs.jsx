import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-base-100 flex flex-col">
            <Navbar />

            {/* Hero */}
            <div className="bg-gray-100 py-20 text-center px-4">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">Our Journey</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Changing the way vehicle rentals work, one ride at a time.
                </p>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-16 space-y-20">

                {/* Section 1 */}
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="flex-1">
                        <div className="text-6xl text-gray-200 font-bold mb-4">01</div>
                        <h2 className="text-3xl font-bold mb-4 text-primary">The beautiful beginning</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            We procured the 1st license and decided to change the way Bike rentals worked in India.
                            With 5 motorcycles and a pocket full of confidence, the journey started to make mobility accessible to everyone.
                        </p>
                    </div>
                    <div className="flex-1">
                        <img src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2070&auto=format&fit=crop" alt="Beginning" className="rounded-2xl shadow-xl w-full h-64 object-cover" />
                    </div>
                </div>

                {/* Section 2 */}
                <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
                    <div className="flex-1">
                        <div className="text-6xl text-gray-200 font-bold mb-4">02</div>
                        <h2 className="text-3xl font-bold mb-4 text-secondary">Achieving milestones</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            It was not long before we shifted gears and included scooters to our fleet, becoming the single largest fleet owner
                            of rental bikes. We introduced a wide range of motorcycles to serve every rider's need.
                        </p>
                    </div>
                    <div className="flex-1">
                        <img src="https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?q=80&w=2070&auto=format&fit=crop" alt="Milestones" className="rounded-2xl shadow-xl w-full h-64 object-cover" />
                    </div>
                </div>

                {/* Section 3 */}
                <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="flex-1">
                        <div className="text-6xl text-gray-200 font-bold mb-4">03</div>
                        <h2 className="text-3xl font-bold mb-4 text-accent">Striving to create a legacy</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            The concept of shared mobility picked up, and so did our brand. We moved from a few cities to 40+ cities across the country.
                            We launched guided tours, marked our presence in new domains, and rewrote the rules of riding.
                        </p>
                    </div>
                    <div className="flex-1">
                        <img src="https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop" alt="Legacy" className="rounded-2xl shadow-xl w-full h-64 object-cover" />
                    </div>
                </div>

                {/* Section 4 */}
                <div className="flex flex-col md:flex-row-reverse gap-10 items-center">
                    <div className="flex-1">
                        <div className="text-6xl text-gray-200 font-bold mb-4">04</div>
                        <h2 className="text-3xl font-bold mb-4 text-primary">All set to touch new heights</h2>
                        <p className="text-lg text-gray-600 leading-relaxed">
                            This year marks significant growth. From a bootstrapped venture to a funded company,
                            we are investing in technology and fleet expansion to bring you the best rental experience possible.
                        </p>
                    </div>
                    <div className="flex-1">
                        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" alt="Growth" className="rounded-2xl shadow-xl w-full h-64 object-cover" />
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default AboutUs;
