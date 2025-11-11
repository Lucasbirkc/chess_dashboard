//import axiosInstance from "./axiosInstance";
import { apiRequest } from '@/services/api/csrf';

const fetchWinRate = async () => {
  try {
    const response = await apiRequest('http://localhost:8000/api/players/win_rate/');
    
    if (response.ok) {
      const data = await response.json();
      return data
    }
  } catch (err) {
    console.error('Failed to fetch win rate:', err);
  }
};

export default fetchWinRate;