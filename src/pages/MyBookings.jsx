import React from "react";
import dubaiImage from "../assets/dubai.png";
import baliImage from "../assets/bali.jpg";
import thailandImage from "../assets/thailand.jpg";
import maldivesImage from "../assets/maldives.jpg";
import singaporeImage from "../assets/singapore.jpg";

export default function MyBookings() {
  const bookings = [
    {
      id: 1,
      title: "Dubai Premium Tour",
      date: "12 Feb 2025",
      price: "₹45,000",
      image: dubaiImage,
      status: "Confirmed",
    },
    {
      id: 2,
      title: "Bali Island Escape",
      date: "25 Mar 2025",
      price: "₹38,500",
      image: baliImage,
      status: "Pending",
    },
    {
      id: 3,
      title: "Thailand Adventure",
      date: "05 Apr 2025",
      price: "₹40,000",
      image: thailandImage,
      status: "Confirmed",
    },
    {
      id: 4,
      title: "Maldives Luxury Getaway",
      date: "15 May 2025",
      price: "₹55,000",
      image: maldivesImage,
      status: "Pending",
    },
    {
      id: 5,
      title: "Singapore City Tour",
      date: "20 Jun 2025",
      price: "₹42,000",
      image: singaporeImage,
      status: "Confirmed",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">My Bookings</h1>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="rounded-xl border bg-white shadow hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            <img
              src={b.image}
              alt={b.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-5">
              <h2 className="text-xl font-semibold">{b.title}</h2>
              <p className="text-gray-600 mt-1">📅 {b.date}</p>
              <p className="text-gray-700 mt-1 font-medium">💰 {b.price}</p>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-semibold 
                  ${
                    b.status === "Confirmed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {b.status}
              </span>

              {/* Buttons */}
              <div className="mt-4 flex gap-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                  View Details
                </button>

                {b.status !== "Confirmed" && (
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
