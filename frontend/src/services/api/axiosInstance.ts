import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/users/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // true, since using cookies for auth
});

export default axiosInstance;