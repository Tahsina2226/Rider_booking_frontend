import { Outlet, Link } from "react-router-dom";
import Footer from "./layouts/Footer";
import Navbar from "./layouts/Navbar";
function App() {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet />
      <Footer></Footer>
    </div>
  );
}

export default App;
