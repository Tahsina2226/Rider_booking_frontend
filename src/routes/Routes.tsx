import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home.tsx";
import About from "../pages/About.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
    ],
  },
]);
