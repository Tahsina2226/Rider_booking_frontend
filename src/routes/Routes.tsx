import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import About from "../pages/About/about";
import Contact from "../pages/Contact/Contact";
import FAQ from "../pages/FAQ/FAQ";
import Login from "../pages/login/Login";
import Register from "../pages/login/Register";

import RiderDashboard from "../pages/Dashboard/RiderDashboard/RiderDashboard";
import DriverDashboard from "../pages/Dashboard/DriverDashboard/DriverDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard/AdminDashboard";
import Features from "@/pages/Features/Features";

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
      { path: "rider", element: <RiderDashboard /> },
      { path: "driver", element: <DriverDashboard /> },
      { path: "admin", element: <AdminDashboard /> },
    ],
  },
]);
