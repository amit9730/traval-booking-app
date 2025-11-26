import React, { useState } from "react";
import { Link } from "react-router-dom";

import dubaiImage from "../assets/dubai.png";
import baliImage from "../assets/bali.jpg";
import thailandImage from "../assets/thailand.jpg";
import maldivesImage from "../assets/maldives.jpg";
import singaporeImage from "../assets/singapore.jpg";

export default function Destinations() {
  const allDestinations = [
    {
      id: 1,
      title: "Dubai Premium Tour",
      slug: "dubai-premium-tour",
      price: 45000,
      image: dubaiImage,
      days: "5 Days",
      country: "UAE",
      category: "Middle-East",
    },
    {
      id: 2,
      title: "Bali Island Escape",
      slug: "bali-island-escape",
      price: 38500,
      image: baliImage,
      days: "6 Days",
      country: "Indonesia",
      category: "Asia",
    },
    {
      id: 3,
      title: "Thailand Adventure",
      slug: "thailand-adventure",
      price: 40000,
      image: thailandImage,
      days: "7 Days",
      country: "Thailand",
      category: "Asia",
    },
    {
      id: 4,
      title: "Maldives Luxury Getaway",
      slug: "maldives-luxury-getaway",
      price: 55000,
      image: maldivesImage,
      days: "5 Days",
      country: "Maldives",
      category: "Asia",
    },
    {
      id: 5,
      title: "Singapore City Tour",
      slug: "singapore-city-tour",
      price: 42000,
      image: singaporeImage,
      days: "4 Days",
      country: "Singapore",
      category: "Asia",
    },
  ];

  // 🎯 STATES
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // 🎯 FILTER LOGIC
  const filtered = allDestinations.filter((d) => {
    return (
      d.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "" || d.category === category) &&
      (maxPrice === "" || d.price <= Number(maxPrice))
    );
  });

  return (
    <div className="container mx-auto px-4 py-10">

      {/* PAGE TITLE */}
      <h1 className="text-3xl font-bold mb-6">All Destinations</h1>

      {/* 🔍 SEARCH + FILTER SECTION */}
      <div className="grid md:grid-cols-3 gap-4 bg-white p-4 mb-6 rounded shadow">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search destination..."
          className="p-3 border rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* CATEGORY FILTER */}
        <select
          className="p-3 border rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Asia">Asia</option>
          <option value="Middle-East">Middle-East</option>
        </select>

        {/* MAX PRICE FILTER */}
        <input
          type="number"
          placeholder="Max Budget (₹)"
          className="p-3 border rounded"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>

      {/* DESTINATION CARDS */}
      <div className="grid gap-8 md:grid-cols-3">
        {filtered.length === 0 ? (
          <p className="text-gray-600">No destinations found.</p>
        ) : (
          filtered.map((d) => (
            <div
              key={d.id}
              className="border rounded-lg overflow-hidden shadow bg-white"
            >
              <img
                src={d.image}
                alt={d.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-4">
                <h2 className="text-xl font-semibold">{d.title}</h2>
                <p className="text-gray-500">{d.country}</p>

                <p className="mt-2 text-green-600 font-medium">₹{d.price}</p>
                <p className="text-gray-600 text-sm">{d.days}</p>

                <Link
                  to={`/destinations/${d.slug}`}
                  className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
