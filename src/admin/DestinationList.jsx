import { useEffect, useState } from "react";
import axios from "axios";

export default function DestinationList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchDest();
  }, []);

  const fetchDest = async () => {
    const res = await axios.get("http://localhost:5000/api/destinations");
    setItems(res.data);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">All Destinations</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {items.map((d) => (
          <div key={d._id} className="bg-white p-4 rounded shadow">
            <img src={d.image} className="w-full h-40 object-cover rounded" />
            <h3 className="font-semibold mt-2">{d.title}</h3>
            <p className="text-gray-500">{d.country}</p>
            <p className="font-bold text-green-600">₹{d.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
