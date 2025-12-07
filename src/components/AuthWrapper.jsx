import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { useShare } from '../contexts/ShareContext';

const AuthWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { pendingShares } = useShare();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = Cookies.get('token');
      console.log('AuthWrapper checking status, token exists:', !!token);

      if (!token) {
        console.log('AuthWrapper: No token, redirecting to auth');
        setIsAuthenticated(false);
        navigate('/auth');
        return;
      }

      try {
        console.log('AuthWrapper: Validating token...');
        await authAPI.getProfile();
        console.log('AuthWrapper: Token valid');
        setIsAuthenticated(true);
      } catch (error) {
        console.error('AuthWrapper: Token invalid', error);
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        setIsAuthenticated(false);
        navigate('/auth');
      }
    };

    checkAuthStatus();
  }, [navigate]);

  if (isAuthenticated === null) {
    return null;
  }

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

  return null;
};

export default AuthWrapper;