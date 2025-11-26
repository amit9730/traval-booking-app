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
    let mounted = true;
    setLoading(true);
    api
      .get(`/api/destinations/${slug}`)
      .then((res) => {
        if (!mounted) return;
        const d = res.data?.destination ?? res.data;
        setDest(d);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load destination. Please try again.");
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading)
    return <div className="container mx-auto px-4 py-12">Loading...</div>;
  if (error)
    return (
      <div className="container mx-auto px-4 py-12 text-center text-red-600">
        {error}
      </div>
    );
  if (!dest)
    return (
      <div className="container mx-auto px-4 py-12 text-center text-gray-600">
        Destination not found.
      </div>
    );

  const {
    title,
    country,
    city,
    durationDays,
    pricePerPerson,
    price, // <-- Add original price field
    description,
    images = [],
    highlights = [],
    itinerary = [],
    ratings = {},
  } = dest;

  const avgRating = ratings?.avg ?? 0;
  const ratingCount = ratings?.count ?? 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <div className="h-72 rounded-lg overflow-hidden relative">
            <img
              src={images[0] ?? "/placeholder.jpg"}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute left-6 bottom-6 text-white">
              <h1 className="text-3xl font-bold">{title}</h1>
              <p className="text-sm">{city ? `${city}, ` : ""}{country}</p>
              <div className="mt-2 flex items-center space-x-3">
                <StarRating value={avgRating} />
                <span className="text-sm text-white/90">({ratingCount} reviews)</span>
              </div>
            </div>
          </div>

          <section className="prose max-w-none">
            <h2 className="text-2xl font-semibold mt-2">About this trip</h2>
            <p className="text-gray-700">{description}</p>
          </section>

          {highlights.length > 0 && (
            <section className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Highlights</h3>
              <ul className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
                {highlights.map((h, i) => (
                  <li key={i} className="border rounded p-3 bg-white shadow-sm text-sm">
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {itinerary.length > 0 && (
            <section className="mt-6">
              <h3 className="text-xl font-semibold mb-3">Itinerary</h3>
              <div className="space-y-3">
                {itinerary.map((day, idx) => (
                  <div key={idx} className="p-4 border rounded flex gap-4 items-start bg-white shadow-sm">
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

          <section className="mt-6">
            <h3 className="text-xl font-semibold mb-3">Reviews</h3>
            <ReviewsList destinationId={dest._id} initialReviews={dest.reviews || []} />
          </section>
        </div>

        <aside className="space-y-6">
          <div className="sticky top-24">
            <div className="border rounded-lg p-5 shadow-sm">
              <div>
                <div className="text-sm text-gray-500">From</div>
                <div className="text-2xl font-bold">
                  ₹{(pricePerPerson ?? price)?.toLocaleString()} {/* ✅ Handle both fields */}
                </div>
                <div className="text-sm text-gray-500">{durationDays ?? dest.days} days</div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => navigate("/checkout", { state: { destination: dest } })}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded font-medium"
                >
                  Book Now
                </button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {images.slice(0, 6).map((src, i) => (
                <img
                   key={i}
                  src={src}
                  alt={`${title} ${i}`}
                  className="w-full h-20 object-cover rounded"
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
