import { apiFetch } from "../../../API/client";

export async function logout() {

  return apiFetch("/Account/logout", {
    method: "POST"
  });

}

