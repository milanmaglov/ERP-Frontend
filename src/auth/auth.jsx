// src/auth/auth.js

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUserRole = (token) => {
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Decoded token payload:', payload); // Debugging line

    // Extract the role using the correct key
    const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    return payload[roleClaim];
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
