import { apiFetch } from "../../../API/client";


export async function verifyOTP(email, otp) {
  const formData = new FormData();

  formData.append("Email", email);
  formData.append("OTP", otp);
  console.log("Form Data:", [...formData.entries()]); // Log the form data for debugging
  return apiFetch("/Account/verify-OTP", {
    method: "POST",
    body: formData,
  });

}

export async function resendOTP(email) {
  const formData = new FormData();

  formData.append("Email", email);

  return apiFetch("/Account/reset-code-OTP", {
    method: "POST",
    body: formData,
  });
}
