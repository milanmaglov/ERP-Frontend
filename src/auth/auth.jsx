// src/auth/auth.js

export const getToken = () => {
  return localStorage.getItem('token');
};

export const getUserRole = (token) => {
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    console.log('Decoded token payload:', payload);

    const roleClaim = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
    const nameValue = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier";

    return {
      role: payload[roleClaim],
      userId: payload[nameValue]
    };
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
