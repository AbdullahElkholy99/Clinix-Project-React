import { Routes, Route } from "react-router-dom";

import LoginPage from "../components/Account/Login/login";
import Register from "../Components/Account/Register/Register";
import ConfirmEmail from "../Components/Account/ConfirmEmail/ConfirmEmail";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<Register />} />
      <Route path="/confirmEmail" element={<ConfirmEmail />} />
    </Routes>
  );
}
