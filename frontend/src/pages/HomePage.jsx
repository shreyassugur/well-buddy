import { Link } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Navbar />

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-16 pb-32 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8">
              Your Journey to a <br />
              <span className="text-green-600">Healthier Lifestyle</span>
            </h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed">
              Track habits, log workouts, join challenges, and compete with friends.
              WellBuddy makes wellness fun, social, and rewarding.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                to="/users/signup"
                className="px-8 py-4 bg-green-600 text-white rounded-xl font-bold text-lg hover:bg-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Start for Free
              </Link>
              <Link
                to="/users/login"
                className="px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all"
              >
                Log In
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="mt-20 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
            <img
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=2070&auto=format&fit=crop"
              alt="Fitness Dashboard"
              className="rounded-2xl shadow-2xl border border-gray-100 mx-auto w-full max-w-5xl"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
