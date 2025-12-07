import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { useShare } from '../contexts/ShareContext';
import './SavedTemplates.css';

export default function PendingShares() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { pendingShares, loading: sharesLoading, fetchPendingShares, respondToShare } = useShare();
  const navigate = useNavigate();

  useEffect(() => {
    const initialize = async () => {
      await fetchPendingShares();
      setLoading(false);
    };
    initialize();
  }, [fetchPendingShares]);

  const handleShareResponse = async (templateId, action) => {
    try {
      const response = await respondToShare(templateId, action);
      // The respondToShare function returns { success: true } or { success: false, error }
      if (response.success) {
        setSuccess(`Template ${action}ed successfully!`);
        // The context now handles refreshing the pending shares, so we don't need to call fetchPendingShares here
        setTimeout(() => setSuccess(''), 3000);
      } else {
        throw response.error;
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || `Failed to ${action} template`);
      } else {
        setError('Network error. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('refreshToken');
    navigate('/');
  };

  const isLoading = loading || sharesLoading;

  if (isLoading) {
    return (
      <div className="template-history">
        <div className="loading-container">Loading pending shares...</div>
      </div>
    );
  }

  return (
    <div className="template-history">
      <div className="history-header">
        <div>
          <Link to="/app" className="back-link">← Back to Editor</Link>
          <h1>Pending Template Shares</h1>
        </div>
        <button onClick={logout} className="btn-secondary">Logout</button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {pendingShares.length === 0 ? (
        <div className="empty-history">
          <p>No pending template shares.</p>
          <button onClick={() => navigate('/saved')} className="btn-primary">
            View All Templates
          </button>
        </div>
      ) : (
        <div className="templates-grid">
          {pendingShares.map(template => (
            <div key={template._id} className="template-card shared-template">
              <h3>{template.name}</h3>
              <div className="template-meta">
                <span>From: {template.userId?.username || template.userId?.email}</span>
                <span>{formatDate(template.createdAt)}</span>
              </div>
              <p className="shared-template-description">
                {template.userId?.username || template.userId?.email} wants to share this template with you.
              </p>
              <div className="template-actions">
                <button
                  onClick={() => handleShareResponse(template._id, 'accept')}
                  className="btn-primary"
                >
                  Accept
                </button>
                <button
                  onClick={() => handleShareResponse(template._id, 'reject')}
                  className="btn-danger"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}