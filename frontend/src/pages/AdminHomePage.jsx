import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import Createcard from "../components/Createcard"
import Navbar from "../components/Navbar"
import { Link } from "react-router"
import Footer from "../components/Footer"

const AdminHomePage = () => {
  const [cards,setCards] = useState([])
  const [loading,setLoading] = useState(true)

  useEffect( ()=>{
    const fetchall = async() => {
      try {
        const res= await axios.get("https://bknd-4.onrender.com")
        console.log(res.data)
        setCards(res.data)
      } catch (error) {
        toast.error("counldnt load data admin")
      }
      finally{
        setLoading(false)
      }
    }

    fetchall()
  },[])



  return (
    <div className="min-h-screen">
      <Navbar/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map(card=>{
          return     <Link to={`/admin/${card._id}`} key={card._id}><Createcard card={card}/></Link>
        })}
      </div>
      <div className="text-center">
      <Link to="/admin/create" className="btn bg-green-800 mx-auto">Create New</Link>
      </div>
      <Footer/>
    </div>
  )
}

export default AdminHomePage
