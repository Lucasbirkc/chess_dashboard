//import axiosInstance from "./axiosInstance";
import { apiRequest } from '@/services/api/csrf';
import { type RecentGamesResponse } from '@/types/types';

export const fetchWinRate = async () => {
  try {
    const response = await apiRequest('/api/chess/players/win_rate/');
    
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
    const response = await apiRequest('/api/chess/players/peak_rating/');
    
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
    const response = await apiRequest('/api/chess/players/latest_rating/');
    
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
    const response = await apiRequest(`/api/chess/players/openings`);

    if (response.ok) {
      const data = await response.json()
      return data
    }
  } catch (err) {
    console.error('Failed to fetch openings:', err);
  }
};

export async function fetchRecentGames() {
  try {
    const response = await apiRequest(`/api/chess/players/recent_games`);
    
    if (response.ok) {
      const data = await response.json()
      return data as RecentGamesResponse
    }
    throw new Error('Failed to fetch recent games')
  } catch (err) {
    console.error('Failed to fetch recent games:', err);
    throw new Error('Error fetching recent games.')
  }
};