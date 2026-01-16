import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactUs = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />

            <div className="bg-white py-16 text-center shadow-sm">
                <h1 className="text-4xl font-bold mb-2 text-gray-800">Reach Us</h1>
                <p className="text-gray-500">We are here to help you with your bookings and queries.</p>
            </div>

            <div className="flex-grow flex items-center justify-center py-20 px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">

                    {/* Phone Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center border border-gray-100">
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                            📞
                        </div>
                        <h3 className="text-xl font-bold mb-4">Call Us</h3>
                        <p className="text-gray-600 mb-2">Speak to our support team directly.</p>
                        <div className="font-semibold text-lg text-gray-800">
                            <p>+91 77956 87594</p>
                            <p>+91 90195 95595</p>
                        </div>
                    </div>

                    {/* Email Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center border border-gray-100">
                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                            ✉️
                        </div>
                        <h3 className="text-xl font-bold mb-4">Email Us</h3>
                        <p className="text-gray-600 mb-2">Write to us for detailed queries.</p>
                        <a href="mailto:support@rentalbuddy.com" className="font-semibold text-lg text-blue-600 hover:underline">
                            support@rentalbuddy.com
                        </a>
                    </div>

                    {/* Chat Card */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all text-center border border-gray-100">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
                            💬
                        </div>
                        <h3 className="text-xl font-bold mb-4">Chat with Us</h3>
                        <p className="text-gray-600 mb-2">Instant support via WhatsApp.</p>
                        <button className="btn btn-primary btn-outline rounded-full px-8 mt-2">
                            Start Chat
                        </button>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactUs;
