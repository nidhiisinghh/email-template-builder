import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (token) {
      if (location.pathname === '/auth') {
      
        setShowLogoutModal(true);
      } else {
        navigate('/app');
      }
    }
  }, [token, location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleCancel = () => {
    setShowLogoutModal(false);
    navigate('/app');
  };

  if (token) {
    if (showLogoutModal) {
      return (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'var(--bg-dark)',
            padding: '2rem',
            borderRadius: '12px',
            maxWidth: '400px',
            width: '90%',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
          }}>
            <h3 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.25rem' }}>Already Logged In</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              You are currently logged in. Do you want to logout?
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={handleCancel}
                className="btn-secondary"
                style={{ minWidth: '100px' }}
              >
                Go Back
              </button>
              <button
                onClick={handleLogout}
                className="btn-danger"
                style={{ minWidth: '100px' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }

  return children;
};

export default PublicRoute;
