import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link,useNavigate } from "react-router";
import { useParams } from "react-router";
import Footer from "../components/Footer";


const AdminUpdatePage = () => {
  const {id} = useParams()
  const navigate=useNavigate();

  const [card,setCard] = useState(null);
  const [loading,setLoading]=useState(true)
  const [saving,setSaving] = useState(false);

  useEffect( ()=>{
    const fetchcard = async() =>{
      try {
        const token=localStorage.getItem("token");
        const res = await axios.get(`https://bknd-4.onrender.com/admin/${id}`,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        )
        setCard(res.data)
      } catch (error) {
        toast.error("cant get card")
      }
      finally{
        setLoading(false)
      }
    }

    fetchcard();
  },[id])

  console.log({card})

const handledelete = async() => {
  try {
    const token=localStorage.getItem("token");
    await axios.delete(`https://bknd-4.onrender.com/admin/${id}`,{
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    toast.success("deleted");
    navigate("/admin")
  } catch (error) {
    toast.error("couldnt delete")
  }
}

const handlesubmit = async() => {
  try {
    const token=localStorage.getItem("token");
    await axios.put(
      `https://bknd-4.onrender.com/admin/${id}`,
      card, // data
      {
        headers: { Authorization: `Bearer ${token}` } // config
      }
    );
    toast.success("updated");
    navigate("/admin")
  } catch (error) {
    toast.error("cant update try later")
  }
}

if(loading)
{
  return ( <div>loading....</div> )
}

  return (
    <div className="min-h-screen max-w-4xl mx-auto">
      <div className="flex flex-col mx-auto bg-base-300 p-4 m-7 bg-yellow-400">
        <div className="flex align-center justify-between">
          <Link to="/admin" className="btn">
          back to home
          </Link>
          <button onClick={handledelete} className="btn bg-red-600 p-3">
          delete
          </button>
        </div>

        <label className="label m-4">
          <span className="label-text">Enter url:</span>
        </label>
        <input className="input"
        type="text"
        value={card.image}
        onChange={(e)=>{setCard({...card,image:e.target.value})}}
        />

        <label className="label m-4">
          <span className="label-text">enter name</span>
        </label>
        <input className="input"
        type="text"
        value={card.name}
        onChange={(e)=>{setCard({...card,name:e.target.value})}}/>

        <label className="label m-4">
          <span className="label-text">enter location</span>
        </label>
        <input className="input"
        type="text"
        value={card.location}
        onChange={(e)=>{setCard({...card,location:e.target.value})}}/>

        <label className="label m-4">
          <span className="label-text">enter price</span>
        </label>
        <input className="input"
        type="number"
        value={card.price}
        onChange={(e)=>{setCard({...card,price:e.target.value})}}/>

        <label className="label m-4">
          <span className="label-text">enter name</span>
        </label>
        <select className="select"
        value={card.booked? "true":"false"}
        onChange={(e)=>{setCard({...card,booked:e.target.value === "true"})}}>
          <option value="true">booked</option>
          <option value="false">not booled</option>
        </select>

        <button onClick={handlesubmit} className="btn bg-green-700 m-5">update</button>
      </div>
      <Footer/>
    </div>
  )
}

export default AdminUpdatePage
