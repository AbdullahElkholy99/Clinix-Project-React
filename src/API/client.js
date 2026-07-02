import { API_BASE_URL } from "../config";

export async function apiFetch(endpoint, options = {}) {
  const headers = {
    ...options.headers,
  };

  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
  console.log("response : ", response)
  const contentType = response.headers.get("content-type");

  let data;

  if (contentType?.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw new Error(data?.message || data || `HTTP ${response.status}`);
  }

  return data;
}