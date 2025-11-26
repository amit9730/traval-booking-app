import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/travel-hero.png";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-10">
      <section className="grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Explore the world with curated packages
          </h1>
          <p className="mt-4 text-gray-600">
            Search, compare and book trusted packages. Secure payments and 24/7 support.
          </p>
          <Link
            to="/destinations"
            className="inline-block mt-6 px-5 py-3 bg-blue-600 text-white rounded"
          >
            Browse Destinations
          </Link>
        </div>

        <div>
          <img
            src={heroImage}
            alt="travel"
            className="rounded-lg shadow w-full h-[350px] object-cover"
          />
        </div>
      </section>
    </div>
  );
}
