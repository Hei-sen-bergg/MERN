import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData, { withCredentials: true });
    return { success: true, message: response.data.message };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error" };
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials, { withCredentials: true });
    return { success: true, message: "Login successful" , data: response.data.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Error" };
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}/users/profile`, { withCredentials: true });
    return { success: true, data: response.data.data };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Unauthorized" };
  }
};
