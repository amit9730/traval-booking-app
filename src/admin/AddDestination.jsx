import { useState } from "react";
import axios from "axios";

export default function AddDestination() {
  const [data, setData] = useState({
    title: "",
    country: "",
    days: "",
    price: "",
    image: "",
  });

  const handleSave = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/destinations/add", data, {
      headers: { Authorization: localStorage.getItem("adminToken") },
    });
    alert("Destination Added!");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Destination</h2>

      <form className="space-y-4 max-w-lg" onSubmit={handleSave}>
        <input placeholder="Title" className="w-full p-2 border rounded"
          onChange={(e) => setData({ ...data, title: e.target.value })} />

        <input placeholder="Country" className="w-full p-2 border rounded"
          onChange={(e) => setData({ ...data, country: e.target.value })} />

        <input placeholder="Days" className="w-full p-2 border rounded"
          onChange={(e) => setData({ ...data, days: e.target.value })} />

        <input placeholder="Price" className="w-full p-2 border rounded"
          onChange={(e) => setData({ ...data, price: e.target.value })} />

        <input placeholder="Image URL" className="w-full p-2 border rounded"
          onChange={(e) => setData({ ...data, image: e.target.value })} />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
