import axios from "axios";

export const userDetails = async (token) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error.response?.data || error.message);
    throw error;
  }
};
