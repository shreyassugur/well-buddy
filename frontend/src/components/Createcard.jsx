

const Createcard = ({ card }) => {
  const mapquery = `https://www.google.com/maps/search/?api=1&query=${card.location}`;


  return (
    <div className={`${card.booked ? "bg-gray-800 text-white m-5 rounded-md border border-yellow-500 overflow-hidden text-center transition-all duration-300 transform hover:scale-105 hover:bg-red-600" : "bg-gray-800 text-white m-5 rounded-md border border-yellow-500 overflow-hidden text-center transition-all duration-300 transform hover:scale-105 hover:bg-green-600"}`}>
      <figure>
        <img src={card.image} alt={card.name} className="w-full h-48 object-cover" />
      </figure>
      <div className="text-gray-300">{card.name}</div>
      <p><a href={`${mapquery}`} target="_blank" onClick={(e) => e.stopPropagation()} className="text-xl font-bold mt-2">📍{card.location}</a></p>
      <b className="text-gray-400">₹{card.price}</b>
      <p className={`p-2 border rounded-sm ${card.booked ? "bg-red-600" : "bg-green-600"} text-white`}>
        {card.booked ? "Booked" : "Available"}
      </p>

    </div>
  )
}

export default Createcard