import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../layouts/Navbar";
import Footer from "../../layouts/Footer";

const features = () => {
  const { user } = useAuth();

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      <Navbar />
      <div className="flex flex-1 mt-16">
        <aside className="hidden md:flex flex-col space-y-6 bg-gray-800 p-6 w-64 text-white">
          <nav className="flex flex-col gap-3">
            {user?.role === "rider" && (
              <Link
                to="/features/rider"
                className="hover:bg-yellow-400 px-4 py-2 rounded-lg hover:text-gray-900 transition-colors"
              >
                Rider
              </Link>
            )}
            {user?.role === "driver" && (
              <Link
                to="/features/driver"
                className="hover:bg-yellow-400 px-4 py-2 rounded-lg hover:text-gray-900 transition-colors"
              >
                Driver
              </Link>
            )}
            {user?.role === "admin" && (
              <Link
                to="/features/admin"
                className="hover:bg-yellow-400 px-4 py-2 rounded-lg hover:text-gray-900 transition-colors"
              >
                Admin
              </Link>
            )}
          </nav>
        </aside>
        <main className="flex-1 p-6">
          <div className="bg-white shadow-md p-6 rounded-2xl min-h-[calc(100vh-200px)]">
            <Outlet />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default features;
