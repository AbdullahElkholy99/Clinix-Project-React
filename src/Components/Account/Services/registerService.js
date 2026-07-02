import { apiFetch } from "../../../API/client";


export async function registerDoctor(form) {
  const formData = new FormData();

  formData.append("ClinicName", form.clinicName);
  // formData.append("SpecializationId", form.specializationId);
  formData.append("SpecializationId", '4A5C2B50-A4E4-4781-BA15-1B0078041D7E');
  formData.append("FullName", form.fullName);
  formData.append("Email", form.email);
  formData.append("Password", form.password);
  formData.append("ConfirmPassword", form.confirmPassword);
  formData.append("PhoneNumber", form.phoneNumber);
  formData.append("Address", form.address);

  return apiFetch("/Account/RegisterDoctor", {
    method: "POST",
    body: formData,
  });

}

export async function registerPatient(form) {
  const formData = new FormData();

  formData.append("FullName", form.fullName);
  formData.append("Email", form.email);
  formData.append("Password", form.password);
  formData.append("ConfirmPassword", form.confirmPassword);
  formData.append("PhoneNumber", form.phoneNumber);
  formData.append("Address", form.address);

  console.log("Form Data:", [...formData.entries()]); // Log the form data for debugging
  return apiFetch("/Account/RegisterPatient", {
    method: "POST",
    body: formData,
  });

}

export async function registerAdmin(form) {
  const formData = new FormData();

  formData.append("FullName", form.fullName);
  formData.append("Email", form.email);
  formData.append("Password", form.password);
  formData.append("ConfirmPassword", form.confirmPassword);
  formData.append("PhoneNumber", form.phoneNumber);
  formData.append("Address", form.address);
  formData.append("Roles", form.role);

  return apiFetch("/Account/RegisterAdmin", {
    method: "POST",
    body: formData,
  });

}

 