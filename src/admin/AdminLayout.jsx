import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h1 className="text-xl font-bold">Admin Panel</h1>

        <nav className="space-y-3">
          <Link to="/admin/add-destination" className="block">➕ Add Destination</Link>
          <Link to="/admin/destinations" className="block">📍 All Destinations</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 bg-gray-100">
        <Outlet />
      </div>

    </div>
  );
}
