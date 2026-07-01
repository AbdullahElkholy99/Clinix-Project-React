import { Routes, Route } from "react-router-dom";

import LoginPage from "../components/Account/Login/login";
import Register from "../Components/Account/Register/Register";
import ConfirmEmail from "../Components/Account/ConfirmEmail/ConfirmEmail";
import DoctorManageAppointments from "@/Components/DoctorComponents/Appointment/DoctorAppointment";
import DoctorClinic from "@/Components/DoctorComponents/Clinic/DoctorClinic";
import DoctorBooking from "@/Components/DoctorComponents/Booking/DoctorBooking";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Register />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<Register />} />
      <Route path="/confirmEmail" element={<ConfirmEmail />} />



      <Route path="/doctorManageAppointments/:id" element={<DoctorManageAppointments />} />
      <Route path="/doctorClinic" element={<DoctorClinic />} />
      <Route path="/doctorBooking" element={<DoctorBooking />} />
    </Routes>
  );
}
