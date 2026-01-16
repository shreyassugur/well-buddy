import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

const InfoPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dates, setDates] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        const res = await api.get(`/vehicles/${id}`);
        setVehicle(res.data);
      } catch (error) {
        toast.error("Could not load vehicle details");
      } finally {
        setLoading(false);
      }
    };
    fetchVehicle();
  }, [id]);

  const handleBooking = async () => {
    if (!user) {
      toast.error("Please login to book");
      navigate("/users/login");
      return;
    }
    if (!dates.startDate || !dates.endDate) {
      toast.error("Please select start and end dates");
      return;
    }

    try {
      await api.post("/rentals/book", {
        vehicleId: id,
        startDate: dates.startDate,
        endDate: dates.endDate
      });
      toast.success("Vehicle booked successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Booking failed");
    }
  };

  if (loading) return <div className="text-center p-10">Loading details...</div>;
  if (!vehicle) return <div className="text-center p-10">Vehicle not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow p-6 container mx-auto">
        <Link to="/" className="text-blue-500 hover:underline mb-4 inline-block">← Back to Home</Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="h-96">
            <img
              src={vehicle.images?.[0] || "https://via.placeholder.com/600x400"}
              alt={vehicle.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4">{vehicle.name}</h1>
              <p className="text-xl text-gray-600 mb-2">Location: {vehicle.location}</p>
              <p className="text-3xl text-green-600 font-bold mb-4">₹{vehicle.price}<span className="text-sm text-gray-500"> / day</span></p>

              <div className="divider my-4"></div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Select Rental Dates</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500">Start Date</label>
                    <input
                      type="date"
                      className="border p-2 rounded w-full"
                      value={dates.startDate}
                      onChange={(e) => setDates({ ...dates, startDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500">End Date</label>
                    <input
                      type="date"
                      className="border p-2 rounded w-full"
                      value={dates.endDate}
                      onChange={(e) => setDates({ ...dates, endDate: e.target.value })}
                      min={dates.startDate || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
              </div>
            </div>

            {vehicle.isAvailable ? (
              <button
                onClick={handleBooking}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-xl hover:bg-blue-700 transition"
              >
                Book Now
              </button>
            ) : (
              <button disabled className="w-full bg-gray-400 text-white py-4 rounded-lg font-bold text-xl cursor-not-allowed">
                Currently Untitled/Rented
              </button>
            )}

            {vehicle.ownerId && (
              <p className="text-xs text-gray-400 mt-4 text-center">Owned by {vehicle.ownerId.fullName}</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default InfoPage;
