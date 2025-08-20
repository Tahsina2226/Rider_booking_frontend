import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home.tsx";
import About from "../pages/About/about.tsx";
import Contact from "@/pages/Contact/Contact.tsx";
import FAQ from "@/pages/FAQ/FAQ.tsx";
import Login from "@/pages/login/Login.tsx";
import Register from "@/pages/login/Register.tsx";

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
]);
