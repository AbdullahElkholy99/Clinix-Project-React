

import { apiFetch } from "../../../API/client";
import { GetUserId } from "../../Account/Services/tokenService";

export async function getAllClinics() {
    const doctorId = GetUserId();
    if (!doctorId) return null;

    return apiFetch(`/DoctorClinics/GetAllDoctorClinic/${doctorId}`, {
        method: "GET"
    });

}

 