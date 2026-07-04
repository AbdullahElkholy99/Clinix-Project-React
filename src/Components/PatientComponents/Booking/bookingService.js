import { apiFetch } from "../../../API/client";
import { getToken, GetUserId } from "../../Account/Services/tokenService";

export async function getClinicAppointments(clinicId) {
  const token = getToken();

  return apiFetch(`/AppointmentAtClinics/GetDoctorClinicAppointments?doctorClinicId=${clinicId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
}

export async function createAppointment(bookingData) {
  const token = getToken();
  const formData = new FormData();

  Object.keys(bookingData).forEach((key) => {
    if (bookingData[key] !== null && bookingData[key] !== undefined) {
      formData.append(key, bookingData[key]);
    }
  });

  return apiFetch("/PatientBookingDoctorAtClinics", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
    body: formData,
  });
}

export async function getPatientAppointments() {
  const token = getToken();
  const patientId = GetUserId();

  return apiFetch(`/PatientBookingDoctorAtClinics/get-all-booking-at-clinic-by-patient-id/${patientId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
}
export async function getAllDoctorClinics() {
  const token = getToken();
  const drId = "ce1c9dc3-a822-49c7-9647-bcfc89bac06f";

  return apiFetch(`/DoctorClinics/GetAllDoctorClinic/${drId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
}