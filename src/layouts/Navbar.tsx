import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/features", label: "Features" },
    { path: "/contact", label: "Contact" },
    { path: "/faq", label: "FAQ" },
  ];

  return (
    <nav className="top-0 left-0 z-50 fixed bg-[#ECEEDF] shadow-sm w-full">
      <div className="flex justify-between items-center mx-auto px-6 py-3 container">
        {/* Logo */}
        <Link to="/" className="font-bold text-gray-800 text-2xl tracking-wide">
          RideFlow
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <li key={item.path} className="group relative">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `transition-all duration-300 px-1 py-1 ${
                    isActive
                      ? "text-gray-900 font-semibold"
                      : "text-gray-700 hover:text-gray-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
              <span className="bottom-0 left-0 absolute bg-gray-900 w-0 group-hover:w-full h-1 transition-all"></span>
            </li>
          ))}
          <li>
            <Link
              to="/login"
              className="bg-gradient-to-r from-[#E0A96D] via-[#D18F5F] to-[#C77B4E] hover:opacity-90 shadow-sm px-5 py-2 rounded-full font-medium text-white transition-opacity"
            >
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-[#ECEEDF] shadow-sm overflow-hidden transition-all duration-300 z-40 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 p-6">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-2 py-2 rounded-md ${
                    isActive
                      ? "text-gray-900 font-semibold"
                      : "text-gray-700 hover:text-gray-900"
                  } transition-colors`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block bg-gradient-to-r from-[#E0A96D] via-[#D18F5F] to-[#C77B4E] hover:opacity-90 shadow-sm px-5 py-2 rounded-full font-medium text-white text-center transition-opacity"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
