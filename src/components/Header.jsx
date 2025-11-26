import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="bg-white shadow">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-xl font-bold">TravelBook</Link>

        <nav className="space-x-4">
          <Link to="/destinations" className="hover:underline">Destinations</Link>
          <Link to="/my-bookings" className="hover:underline">My Bookings</Link>
          <Link to="/auth" className="px-3 py-1 border rounded">Login</Link>
        </nav>
      </div>
    </header>
  )
}
