import { Outlet, Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";
import { useState } from "react";

const Features = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  const roleConfig = {
    rider: {
      title: "Rider Dashboard",
      icon: "🚴",
      color: "from-[#CFAB8D] to-[#D9C4B0]",
    },
    driver: {
      title: "Driver Dashboard",
      icon: "🚗",
      color: "from-[#CFAB8D] to-[#D9C4B0]",
    },
    admin: {
      title: "Admin Dashboard",
      icon: "👨‍💼",
      color: "from-[#CFAB8D] to-[#D9C4B0]",
    },
  };

  const currentRoleConfig = roleConfig[user?.role] || roleConfig.rider;

  return (
    <div className="flex flex-col bg-gray-50 min-h-screen">
      <Navbar />

      {/* Mobile menu toggle */}
      <div className="md:hidden top-16 right-4 z-50 fixed">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="bg-gray-800 shadow-lg p-2 rounded-md text-white"
        >
          {isMobileMenuOpen ? "✕ Close" : "☰ Menu"}
        </button>
      </div>

      <div className="flex flex-1 mt-16">
        {/* Sidebar */}
        <aside
          className={`${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 fixed md:relative inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out md:flex flex-col space-y-6 bg-gradient-to-b ${
            currentRoleConfig.color
          } p-6 w-64 text-white shadow-xl`}
        >
          <nav className="flex flex-col gap-2">
            {user?.role === "driver" && (
              <>
                <Link
                  to="/features/driver"
                  className="group flex items-center space-x-3 hover:bg-white px-4 py-3 rounded-xl hover:text-gray-800 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-xl">🚗</span>
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/features/driver/earnings"
                  className="group flex items-center space-x-3 hover:bg-white px-4 py-3 rounded-xl hover:text-gray-800 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-xl">💰</span>
                  <span>Earnings</span>
                </Link>

                <Link
                  to="/features/driver/availability"
                  className="group flex items-center space-x-3 hover:bg-white px-4 py-3 rounded-xl hover:text-gray-800 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-xl">📩</span>
                  <span>Availability Requests</span>
                </Link>

                <Link
                  to="/features/driver/active-ride"
                  className="group flex items-center space-x-3 hover:bg-white px-4 py-3 rounded-xl hover:text-gray-800 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-xl">🚦</span>
                  <span>Active Ride</span>
                </Link>

                <Link
                  to="/features/driver/profile"
                  className="group flex items-center space-x-3 hover:bg-white px-4 py-3 rounded-xl hover:text-gray-800 transition-all duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-xl">👤</span>
                  <span>Profile</span>
                </Link>
              </>
            )}
          </nav>
        </aside>

        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div
            className="md:hidden z-30 fixed inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6">
          <div className="bg-white shadow-lg p-6 rounded-2xl min-h-[calc(100vh-200px)]">
            <Outlet />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default Features;
