import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Replace with your API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

export const registerUser = async (userData) => {
  try {
    const response = await apiService.post("/api/auth/register", userData);

    return response.data;
  } catch (error) {
    console.log(6);
    throw error.response.data;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await apiService.post("/api/auth/login", userData);

    return response.data;
  } catch (error) {
    console.log(61);
    throw error.response.data;
  }
};
