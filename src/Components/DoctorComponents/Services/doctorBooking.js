

import { apiFetch } from "../../../API/client";
import { GetUserId } from "../../Account/Services/tokenService";

export async function getAllBooking() {
    const doctorId = GetUserId();
    if (!doctorId) return null;

    return apiFetch(`/PatientBookingDoctorAtClinics/get-all-booking-at-clinics/${doctorId}`, {
        method: "GET"
    });

}