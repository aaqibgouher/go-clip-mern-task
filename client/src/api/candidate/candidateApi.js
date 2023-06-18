import axios from "axios";

const API_BASE_URL = "http://localhost:3000"; // Replace with your API base URL

const apiService = axios.create({
  baseURL: API_BASE_URL,
});

const token = localStorage.getItem("token");

export const getCandidates = async () => {
  try {
    const response = await apiService.get("/api/candidate", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(6, "from get candidates api");
    throw error.response.data;
  }
};

export const addCandidate = async (payload) => {
  try {
    console.log(payload, "payload");
    const response = await apiService.post("/api/candidate/add", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(6, "from add candidates api");
    throw error.response.data;
  }
};
