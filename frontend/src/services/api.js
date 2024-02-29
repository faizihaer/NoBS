import axios from "axios";

const API_URL = "http://localhost:4000"; // Update with your backend URL

const api = axios.create({
  baseURL: API_URL,
});

export const getRoutes = async () => {
  try {
    const response = await api.get("/api/routes");
    return response.data;
  } catch (error) {
    console.error("Error fetching routes:", error);
    throw error;
  }
};
