import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Home from "../pages/Home/Home";
import About from "../pages/About/about";
import Contact from "../pages/Contact/Contact";
import FAQ from "../pages/FAQ/FAQ";
import Login from "../pages/login/Login";
import Register from "../pages/login/Login";

import Features from "../pages/Features/Features";
import RiderDashboard from "../pages/Dashboard/RiderDashboard/RiderDashboard";
import AddRideForm from "../pages/Dashboard/RiderDashboard/RiderForm";
import RideHistory from "../pages/Dashboard/RiderDashboard/RideHistory";
import RideDetails from "../pages/Dashboard/RiderDashboard/RideDetails";
import RiderProfile from "../pages/Dashboard/RiderDashboard/RiderProfile";

import DriverDashboard from "../pages/Dashboard/DriverDashboard/DriverDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import UserManagement from "../pages/Dashboard/AdminDashboard/UserManagement";
import Profile from "@/pages/Dashboard/AdminDashboard/Profile";
import RideOversight from "@/pages/Dashboard/AdminDashboard/RideOversight";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/faq", element: <FAQ /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },
  {
    path: "/features",
    element: <Features />,
    children: [
      // Rider
      { path: "rider", element: <RiderDashboard /> },
      { path: "rider/add-ride", element: <AddRideForm /> },
      { path: "rider/ride-history", element: <RideHistory /> },
      { path: "rider/ride-details/:id", element: <RideDetails /> },
      { path: "rider/profile", element: <RiderProfile /> },

      // Driver
      { path: "driver", element: <DriverDashboard /> },

      // Admin
      { path: "admin", element: <AdminDashboard /> },
      { path: "admin/UserManagement", element: <UserManagement /> },
      { path: "admin/Profile", element: <Profile /> },
      { path: "admin/RideOver", element: <RideOversight /> },
    ],
  },
]);
