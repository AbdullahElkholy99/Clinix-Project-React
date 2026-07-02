import { apiFetch } from "../../../../API/client.js"

export const getDoctorClinics = async (doctorId) => {
  return await apiFetch(
    `/DoctorClinics/GetAllDoctorClinic/${doctorId}`
  );
};

export const createAppointment = async (appointment) => {
  return await apiFetch("/AppointmentAtClinics", {
    method: "POST",
    body: JSON.stringify(appointment),
  });
};