import { Routes, Route } from "react-router-dom";

import Login from "../Components/Account/Login/Components/login";
import Register from "../Components/Account/Register/Register";
import ConfirmEmail from "../Components/Account/ConfirmEmail/ConfirmEmail";
import DoctorManageAppointments from "@/Components/DoctorComponents/Appointment/DoctorAppointment";
import DoctorClinic from "@/Components/DoctorComponents/Clinic/DoctorClinic";
import DoctorBooking from "@/Components/DoctorComponents/Booking/DoctorBooking";

import Home from "../Components/HomeComponents/Home/home";
import MainLayout from "@/Components/MainLayout/mainLayout";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/confirmEmail" element={<ConfirmEmail />} />

        <Route element={<MainLayout/>}>
          <Route path="/home" element={<Home />} />
        </Route>  

      <Route path="/doctorManageAppointments/:id" element={<DoctorManageAppointments />} />
      <Route path="/doctorClinic" element={<DoctorClinic />} />
      <Route path="/doctorBooking" element={<DoctorBooking />} />
    </Routes>
  );
}
