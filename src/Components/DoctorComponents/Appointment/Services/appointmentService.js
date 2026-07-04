import { apiFetch } from "../../../../API/client";

export const getDoctorClinics = async (doctorId) => {
  return apiFetch(`/DoctorClinics/GetAllDoctorClinic/${doctorId}`);
};

export const createAppointment = async (appointment) => {
  const formData = new FormData();

  formData.append("DoctorClinicId", appointment.doctorClinicId);
  formData.append("Day", appointment.day);
  formData.append("OpenAt", appointment.openAt);
  formData.append("ClosedAt", appointment.closedAt);

  return apiFetch("/AppointmentAtClinics", {
    method: "POST",
    body: formData,
  });
};

export const getDoctorClinicAppointments = async (doctorClinicId) => {
  return apiFetch(
    `/AppointmentAtClinics/GetDoctorClinicAppointments?doctorClinicId=${doctorClinicId}`
  );
};

export const updateAppointment = async (appointmentId, appointment) => {
  return apiFetch(`/AppointmentAtClinics/${appointmentId}`, {
    method: "PUT",
    body: JSON.stringify({
      day: appointment.day,
      openAt: appointment.openAt,
      closedAt: appointment.closedAt,
    }),
  });
};

export const deleteAppointment = async (appointmentId) => {
  return apiFetch(`/AppointmentAtClinics/${appointmentId}`, {
    method: "DELETE",
  });
};