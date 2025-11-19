//import axiosInstance from "./axiosInstance";
import { apiRequest } from '@/services/api/csrf';
import { type RecentGamesResponse } from '@/types/types';

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

export async function fetchRecentGames() {
  const mockData: RecentGamesResponse = {
  "games": [
    {
      "opponent": "ChessMaster2000",
      "opening_name": "Sicilian Defense: Najdorf Variation",
      "rating": 1847,
      "result": "win",
      "timestamp": "2025-11-18T10:30:00Z"
    },
    {
      "opponent": "KnightRider99",
      "opening_name": "Queen's Gambit Declined",
      "rating": 1762,
      "result": "loss",
      "timestamp": "2025-11-17T18:45:00Z"
    },
    {
      "opponent": "PawnStorm",
      "opening_name": "Italian Game: Giuoco Piano",
      "rating": 1805,
      "result": "draw",
      "timestamp": "2025-11-17T14:20:00Z"
    },
    {
      "opponent": "RookiePlayer",
      "opening_name": "Ruy Lopez: Berlin Defense",
      "rating": 1698,
      "result": "win",
      "timestamp": "2025-11-16T09:15:00Z"
    },
    {
      "opponent": "GrandmasterWannabe",
      "opening_name": "King's Indian Defense",
      "rating": 1923,
      "result": "loss",
      "timestamp": "2025-11-15T20:00:00Z"
    },
    {
      "opponent": "CheckmateKing",
      "opening_name": "French Defense: Winawer Variation",
      "rating": 1781,
      "result": "win",
      "timestamp": "2025-11-14T16:30:00Z"
    }
  ]
}

  try {
    // const response = await apiRequest(`http://localhost:8000/api/players/openings`);
    return mockData;
    // if (response.ok) {
    //   const data = await response.json()
    //   return data
    // }
  } catch (err) {
    console.error('Failed to fetch recent games:', err);
    throw new Error('Error fetching recent games.')
  }
};