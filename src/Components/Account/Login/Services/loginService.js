import { apiFetch } from "../../../../API/client";

export async function loginUser(form) {
  
  const formData = new FormData();
  formData.append("Email", form.email);
  formData.append("Password", form.password);

  return apiFetch("/Account/login", {
    method: "POST",
    body: formData, 
  });
}

