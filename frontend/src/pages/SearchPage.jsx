import { useState, useEffect } from "react"
import Navbar from "../components/Navbar"
import api from "../api/axios";
import toast from "react-hot-toast";
import Createcard from "../components/Createcard";
import { Link, useLocation } from "react-router";
import Footer from "../components/Footer";

const SearchPage = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation()
  const query = new URLSearchParams(location.search).get("search") || "";

  useEffect(() => {
    const fetchall = async () => {
      try {
        const res = await api.get(`/vehicles?search=${query}`);
        setCards(res.data.filter(card => !card.isDeleted))
      } catch (error) {
        console.error("Error fetching vehicles:", error);
        toast.error("Could not fetch vehicles");
        setCards([]);
      }
      finally {
        setLoading(false)
      }
    }

    fetchall();
  }, [query])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto p-6 flex-grow">
        <h2 className="text-2xl font-bold mb-6">Search Results</h2>

        {loading && <div className="text-center">Loading...</div>}

        {!loading && cards.length === 0 && (
          <div className="text-center text-gray-500 py-10">
            <p>No vehicles found.</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(card => {
            return <Link to={`/${card._id}`} key={card._id}><Createcard card={card} /></Link>
          })}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default SearchPage
