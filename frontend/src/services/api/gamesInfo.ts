//import axiosInstance from "./axiosInstance";
import { apiRequest } from '@/services/api/csrf';

export const fetchWinRate = async () => {
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

export const fetchPeakRating = async () => {
  try {
    const response = await apiRequest('http://localhost:8000/api/players/peak_rating/');
    
    if (response.ok) {
      const data = await response.json();
      return data
    }
  } catch (err) {
    console.error('Failed to fetch peak rating:', err);
  }
};

export const fetchLatestRating = async () => {
  try {
    const response = await apiRequest('http://localhost:8000/api/players/latest_rating/');
    
    if (response.ok) {
      const data = await response.json();
      return data
    }
  } catch (err) {
    console.error('Failed to fetch latest rating:', err);
  }
};


export async function fetchPlayerOpenings() {
  try {
    const response = await apiRequest(`http://localhost:8000/api/players/openings`);

    if (response.ok) {
      const data = await response.json()
      return data
    }
  } catch (err) {
    console.error('Failed to fetch openings:', err);
  }
};