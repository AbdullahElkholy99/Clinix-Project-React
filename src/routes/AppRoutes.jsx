import { Routes, Route } from "react-router-dom";

import Login from "../Components/Account/Login/Components/login";
import Register from "../Components/Account/Register/Register";
import ConfirmEmail from "../Components/Account/ConfirmEmail/ConfirmEmail";
import Home from "../Components/HomeComponents/Home/home";
import MainLayout from "@/Components/MainLayout/mainLayout";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirmEmail" element={<ConfirmEmail />} />

      // main layout  
      <Route element={<MainLayout/>}>
        <Route path="/home" element={<Home />} />
        // doctors , labs , appointments ,etc.   

      </Route>
    </Routes>
  );
}
