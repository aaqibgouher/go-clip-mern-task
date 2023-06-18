import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Replace with your API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

const token = localStorage.getItem("token");

export const getCompanyDetails = async () => {
  try {
    const response = await apiService.get("/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(6, "from dashboard api");
    throw error.response.data;
  }
};
