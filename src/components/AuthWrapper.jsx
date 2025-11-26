import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { useShare } from '../contexts/ShareContext';

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { pendingShares } = useShare();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      
      // If no token found, redirect to auth page
      if (!token) {
        setIsAuthenticated(false);
        navigate('/auth');
        return;
      }
      
      try {
        // Validate token by making a request to the profile endpoint
        await authAPI.getProfile();
        setIsAuthenticated(true);
      } catch (error) {
        // Token is invalid or expired
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/auth');
      }
    };

    checkAuthStatus();
  }, [navigate]);

  // Show nothing while checking auth status
  if (isAuthenticated === null) {
    return null;
  }

  // If authenticated, render children with pending shares context
  if (isAuthenticated) {
    return (
      <>
        {pendingShares.length > 0 && (
          <div className="pending-shares-notification">
            <div className="notification-content">
              <p>You have {pendingShares.length} pending template share request(s)</p>
              <button onClick={() => navigate('/pending-shares')} className="btn-primary">
                View Requests
              </button>
            </div>
          </div>
        )}
        {children}
      </>
    );
  }

  // Return null while redirecting
  return null;
};

export default AuthWrapper;