import React, { useEffect } from 'react';

const AuthWrapper = ({ children }) => {
  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    
    // If no token found, redirect to auth page
    if (!token) {
      window.location.href = '/auth';
    }
  }, []);

  // If token exists, render children
  const token = localStorage.getItem('token');
  if (token) {
    return children;
  }
  
  // Return null while redirecting
  return null;
};

export default AuthWrapper;