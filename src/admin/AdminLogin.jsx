import { useState } from "react";
import axios from "axios";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/admin-login", form);
      localStorage.setItem("adminToken", res.data.token);
      window.location.href = "/admin";
    } catch (err) {
      setError("Invalid Credentials!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center"
         style={{ backgroundImage: "url('/admin-bg.jpg')" }}>
      
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            className="w-full p-2 border rounded"
            placeholder="Admin Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            className="w-full p-2 border rounded"
            placeholder="Admin Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
