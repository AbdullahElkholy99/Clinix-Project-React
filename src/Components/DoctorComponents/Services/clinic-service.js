

import { apiFetch } from "../../../API/client";
import { GetUserId } from "../../Account/Services/tokenService";

export async function getAllClinics() {
    const doctorId = GetUserId();
    if (!doctorId) return null;

    return apiFetch(`/DoctorClinics/GetAllDoctorClinic/${doctorId}`, {
        method: "GET"
    });

}

export async function addClinic(clinic) {
    const formData = buildClinicData(null,clinic)

    return apiFetch(`/DoctorClinics`, {
        method: "POST",
        body: formData
    });

}


export async function editClinic(id, clinic) {
    const formData = buildClinicData(id, clinic)
    return apiFetch(`/DoctorClinics`, {
        method: "PUT",
        body: formData
    });

}
export async function deleteClinic(id) {
    const doctorId = GetUserId();

    if (!doctorId) {
        throw new Error("Doctor ID not found.");
    }

    return apiFetch(
        `/DoctorClinics?drId=${doctorId}&clinicId=${id}`,
        {
            method: "DELETE",
        }
    );
}

function buildClinicData(id, clinic) {
    const doctorId = GetUserId();

    const formData = new FormData();
    if (id) {
        formData.append("Id", id);
    }
    formData.append("DoctorId", doctorId);
    formData.append("Governorate", clinic.governorate);
    formData.append("City", clinic.city);
    formData.append("Area", clinic.area);
    formData.append("Street", clinic.street);
    formData.append("Phone", clinic.phone);
    formData.append("Price", clinic.price);

    return formData;
}