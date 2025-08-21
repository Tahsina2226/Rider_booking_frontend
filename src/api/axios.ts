import axios from "axios";

export const API_BASE = "https://rider-booking.onrender.com/api";

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
