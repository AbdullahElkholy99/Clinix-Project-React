import "./App.css";
import { useLocation } from "react-router-dom";

import Navbar from "./Components/DoctorComponents/Bases/NavBar/Navbar";
import Footer from "./Components/HomeComponents/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const location = useLocation();

  const hideLayout = ["/", "/login", "/register", "/confirmEmail"].includes(
    location.pathname,
  );

  return (
    <>
      {!hideLayout && <Navbar />}

      <AppRoutes />

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;


/*
abdullah@gmail.com    abdullah@gmail.comA12
*/