

import { apiFetch } from "../../../API/client";
import { GetUserId } from "../../Account/Services/tokenService";

export async function getAllBooking() {
    const doctorId = GetUserId();
    if (!doctorId) return null;

    return apiFetch(`/PatientBookingDoctorAtClinics/get-all-booking-at-clinics/${doctorId}`, {
        method: "GET"
    });

}

export async function confrimBooking(id) {
   
    return apiFetch(`/PatientBookingDoctorAtClinics/get-all-booking-at-clinics/${id}`, {
        method: "GET"
    });

}
export async function cancelBooking(id) {
    const doctorId = GetUserId();
    if (!doctorId) return null;

    return apiFetch(`/PatientBookingDoctorAtClinics/gcancel/${id}`, {
        method: "GET"
    });

}