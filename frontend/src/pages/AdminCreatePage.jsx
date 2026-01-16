import { useState } from "react"
import toast from "react-hot-toast";
import { Link,useNavigate } from "react-router";
import axios from "axios";
import Footer from "../components/Footer";

const AdminCreatePage = () => {
    const navigate=useNavigate();
    const [image,setImage] = useState("https://picsum.photos/300/300");
    const [name,setName] = useState("");
    const [location,setLocation] = useState("");
    const [price,setPrice] = useState(0);
    const booked = false;

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if ( !name.trim() || !location.trim())
        {
            toast.error("fill all the feilds")
            return;
        }
        try {
            const token=localStorage.getItem("token")
            await axios.post(
                "https://bknd-4.onrender.com/admin/create",
                {image,name,location,price,booked},
                {headers:{Authorization: `Bearer ${token}`}})
            toast.success("created successfully");
            navigate("/admin")
        } catch (error) {
            console.log(error);
            toast.error("could not create")
        }
    }
    
    return (
    <div className="min-h-screen max-w-4xl mx-auto">
      <div className="flex flex-col mx-auto bg-yellow-400 p-4 m-7 rounded-md">
        {/* Back to home */}
        <Link to="/admin" className="btn mb-4">
          Back to Home
        </Link>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="label">
            <span className="label-text">Image URL:</span>
          </label>
          <input
            className="input w-full"
            type="text"
            placeholder="Leave empty if you don't have an image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />

          <label className="label">
            <span className="label-text">Name:</span>
          </label>
          <input
            className="input w-full"
            type="text"
            placeholder="xyz"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label">
            <span className="label-text">Location:</span>
          </label>
          <input
            className="input w-full"
            type="text"
            placeholder="xyz"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <label className="label">
            <span className="label-text">Price:</span>
          </label>
          <input
            className="input w-full"
            type="number"
            placeholder="10,000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button type="submit" className="btn bg-green-700 mt-5">
            Create New
          </button>
        </form>
      </div>
      <Footer/>
    </div>
  );
};

export default AdminCreatePage