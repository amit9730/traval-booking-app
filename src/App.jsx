// import React from "react";
// import { Routes, Route } from "react-router-dom";

// import Header from "./components/Header";
// import Footer from "./components/Footer";

// // User Pages
// import Home from "./pages/Home";
// import Destinations from "./pages/Destinations";
// import DestinationDetail from "./pages/DestinationDetail";
// import Checkout from "./pages/Checkout";
// import Profile from "./pages/Profile";
// import MyBookings from "./pages/MyBookings";
// import Login from "./pages/Login";

// // Admin Pages
// import AdminLogin from "./admin/AdminLogin";
// import AdminLayout from "./admin/AdminLayout";
// import AddDestination from "./admin/AddDestination";
// import DestinationList from "./admin/DestinationList";

// export default function App() {
//   return (
//     <div className="flex flex-col min-h-screen">
      
//       <Header />

//       <main className="flex-1 container mx-auto py-8">
//         <Routes>

//           {/* User Routes */}
//           <Route path="/" element={<Home />} />
//           <Route path="/destinations" element={<Destinations />} />
//           <Route path="/destinations/:slug" element={<DestinationDetail />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/my-bookings" element={<MyBookings />} />
//           <Route path="/auth" element={<Login />} />

//           {/* Admin Routes */}
//           <Route path="/admin-login" element={<AdminLogin />} />

//           <Route path="/admin" element={<AdminLayout />}>
//             <Route path="add-destination" element={<AddDestination />} />
//             <Route path="destinations" element={<DestinationList />} />
//           </Route>

//         </Routes>
//       </main>

//       <Footer />
//     </div>
//   );
// }

import React from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

// User Pages
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";

// Admin Pages
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AddDestination from "./admin/AddDestination";
import DestinationList from "./admin/DestinationList";

// ======================
// PROTECTED ROUTES
// ======================
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/auth" />;
};

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  let isAdmin = false;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      isAdmin = decoded.role === "admin";
    } catch (err) {
      isAdmin = false;
    }
  }

  return isAdmin ? children : <Navigate to="/admin-login" />;
};

// APP COMPONENT

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container mx-auto py-8">
        <Routes>

          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
          <Route path="/auth" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
            <Route path="add-destination" element={<AddDestination />} />
            <Route path="destinations" element={<DestinationList />} />
          </Route>

          {/* 404 Page */}
          <Route path="*" element={<h2 className="text-center text-2xl mt-10">Page Not Found</h2>} />

        </Routes>
      </main>

      <Footer />
    </div>
  );
}

