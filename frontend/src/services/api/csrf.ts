// src/utils/api.ts

let csrfToken: string | null = null;

// Fetch CSRF token on app initialization
export async function initializeCSRF() {
  try {
    const response = await fetch('/api/users/auth/csrf/', {
      credentials: 'include',
    });
    const data = await response.json();
    csrfToken = data.csrfToken;
  } catch (err) {
    console.error('Failed to fetch CSRF token:', err);
  }
}

// Get CSRF token from cookie (alternative method)
function getCsrfFromCookie(): string | null {
  const cookie = document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='));
  return cookie ? cookie.split('=')[1] : null;
}

// API request helper
export async function apiRequest(url: string, options: RequestInit = {}) {
  const token = csrfToken || getCsrfFromCookie();
  
  const defaultOptions: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(token && options.method !== 'GET' && { 'X-CSRFToken': token }),
      ...options.headers,
    },
  };

  return fetch(url, { ...defaultOptions, ...options });
}