import {jwtDecode} from 'jwt-decode';

export function isTokenExpired(token) {
  if (!token) return true; // No token means it's invalid or expired
    try {
        const { exp } = jwtDecode(token); // Decode the token to get the `exp` field
        const now = Date.now() / 1000; // Current time in seconds
        return exp < now; // Return true if the token has expired
    } catch (error) {
        console.error('Error decoding token:', error);
        return true; // Treat as expired if decoding fails
    }
}