import { useState } from "react";
import axios from "axios";

export default function TravelLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",   // 🔥 FIXED ROUTE
        form
      );

      localStorage.setItem("token", res.data.token);
      alert("Login Successful!");
      window.location.href = "/";
    } catch (err) {
      setError("Invalid email or password!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      
      {/* LEFT IMAGE */}
      <div
        className="hidden md:flex w-1/2 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="bg-black/40 w-full h-full flex items-center justify-center">
          <h1 className="text-4xl text-white font-bold drop-shadow-lg">
            Explore The World 🌍  
          </h1>
        </div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 px-8">
        <div className="w-full max-w-md bg-white p-10 shadow-xl rounded-2xl">

          <h2 className="text-3xl font-bold mb-2 text-gray-800 text-center">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-center mb-6">
            Login to your travel account ✈️
          </p>

          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                className="w-full border bg-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                className="w-full border bg-gray-100 p-3 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                placeholder="Enter password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline">
              Register 
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
