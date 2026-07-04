import { apiFetch } from "../../../API/client";

const DOCTOR_ID = "ce1c9dc3-a822-49c7-9647-bcfc89bac06f";

export async function getDoctorClinics() {
  return apiFetch(`/DoctorClinics/GetAllDoctorClinic/${DOCTOR_ID}`, {
    method: "GET",
  });
}