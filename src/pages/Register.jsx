import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import StarRating from "../components/StarRating";
import ReviewsList from "../components/ReviewsList";

export default function DestinationDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [dest, setDest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/destinations/${slug}`)
      .then((res) => {
        console.log("Destination Data:", res.data);
        setDest(res.data); // Backend returns direct destination object
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load destination. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading)
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-gray-600 animate-pulse">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );

  if (!dest)
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-gray-600">Destination Not Found</p>
      </div>
    );

  const {
    _id,
    title,
    country,
    city,
    durationDays,
    pricePerPerson,
    description,
    images = [],
    highlights = [],
    itinerary = [],
    ratings = {},
    reviews = [],
  } = dest;

  const avgRating = ratings?.avg ?? 0;
  const ratingCount = ratings?.count ?? 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <div className="h-72 rounded-lg overflow-hidden relative">
            <img
              src={images?.[0] || "/placeholder.jpg"}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute left-6 bottom-6 text-white">
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-sm">{city ? `${city}, ` : ""}{country}</p>
              <div className="mt-2 flex items-center space-x-3">
                <StarRating value={avgRating} />
                <span className="text-sm text-white/90">
                  ({ratingCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <section>
            <h2 className="text-xl font-semibold mt-2">About this trip</h2>
            <p className="text-gray-700">{description}</p>
          </section>

          {/* Highlights */}
          {highlights.length > 0 && (
            <section className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Highlights</h3>
              <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {highlights.map((h, i) => (
                  <li
                    key={i}
                    className="border rounded p-3 text-sm shadow-sm bg-white"
                  >
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Itinerary */}
          {itinerary.length > 0 && (
            <section className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Itinerary</h3>
              <div className="space-y-3">
                {itinerary.map((day, idx) => (
                  <div
                    key={idx}
                    className="p-4 border rounded bg-white shadow-sm flex gap-4 items-start"
                  >
                    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 font-semibold">
                      Day {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{day.title}</h4>
                      <p className="text-sm text-gray-600">{day.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          <section className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Reviews</h3>
            <ReviewsList destinationId={_id} initialReviews={reviews} />
          </section>
        </div>

        {/* Booking Card + Gallery */}
        <aside className="space-y-6">
          <div className="sticky top-24">
            <div className="p-5 border rounded-lg shadow-sm bg-white">
              <div>
                <div className="text-sm text-gray-500">Starting From</div>
                <div className="text-2xl font-bold">
                  ₹{pricePerPerson?.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500">
                  per person • {durationDays} days
                </div>
              </div>

              <button
                onClick={() => navigate("/checkout", { state: { destination: dest } })}
                className="w-full mt-4 px-4 py-3 bg-green-600 text-white font-medium rounded"
              >
                Book Now
              </button>

              <p className="mt-3 text-xs text-gray-500">
                Secure payments • Free cancellation (terms apply)
              </p>
            </div>

            {/* Small Gallery */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {(images || []).slice(0, 6).map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="w-full h-20 object-cover rounded"
                  alt={`${title}-img-${i}`}
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
