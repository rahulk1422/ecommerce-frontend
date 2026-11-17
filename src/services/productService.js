import api from "./api";

export async function getProducts() {
  const response = await api.get("/products");

  if (!Array.isArray(response.data)) {
    throw new Error("Invalid response from server");
  }

  return response.data;
}