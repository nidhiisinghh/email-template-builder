import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';
import { templateAPI, shareAPI, authAPI } from '../utils/api';
import { useShare } from '../contexts/ShareContext';
import './SavedTemplates.css';

export default function SavedTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [sharingTemplateId, setSharingTemplateId] = useState(null);
  const [recipientEmail, setRecipientEmail] = useState('');
  const [users, setUsers] = useState([]); // For the dropdown
  const [loadingUsers, setLoadingUsers] = useState(false);
  const { fetchPendingShares } = useShare(); // To refresh pending shares after sharing
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const token = Cookies.get('token');
      if (!token) {
        navigate('/');
        return;
      }

      const response = await templateAPI.getAll();
      setTemplates(response.data.templates);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to fetch templates');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch all users for the dropdown
  const fetchUsers = async () => {
    if (users.length > 0) return; // Already fetched

    setLoadingUsers(true);
    try {
      const response = await authAPI.getAllUsers();
      setUsers(response.data.users || []);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const loadTemplate = (templateId) => {
    navigate(`/app?template=${templateId}`);
  };

  const deleteTemplate = async (templateId) => {
    if (!window.confirm('Are you sure you want to delete this template?')) {
      return;
    }

    try {
      await templateAPI.delete(templateId);
      setTemplates(templates.filter(template => template._id !== templateId));
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to delete template');
      } else {
        setError('Network error. Please try again.');
      }
    }
  };

  const startSharing = (templateId) => {
    setSharingTemplateId(templateId);
    setRecipientEmail('');
    fetchUsers(); // Fetch users when opening the share form
  };

  const cancelSharing = () => {
    setSharingTemplateId(null);
    setRecipientEmail('');
    setError('');
    setSuccess('');
  };

  const shareTemplate = async () => {
    if (!recipientEmail) {
      setError('Please select a recipient');
      return;
    }

    try {
      await shareAPI.shareTemplate(sharingTemplateId, recipientEmail);
      setSuccess('Template shared successfully!');
      setError('');

      // Refresh pending shares for all users
      fetchPendingShares();

      setTimeout(() => {
        cancelSharing();
      }, 1500);
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Failed to share template');
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

  if (loading) {
    return (
      <div className="template-history">
        <div className="loading-container">Loading templates...</div>
      </div>
    );
  }

  return (
    <div className="template-history">
      <div className="history-header">
        <div>
          <Link to="/app" className="back-link">← Back to Editor</Link>
          <h1>Saved Templates ({templates.length})</h1>
        </div>
        <button onClick={logout} className="btn-secondary">Logout</button>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      {templates.length === 0 ? (
        <div className="empty-history">
          <p>No templates found. Create your first template!</p>
          <button onClick={() => navigate('/app')} className="btn-primary large">
            Create Template
          </button>
        </div>
      ) : (
        <div className="templates-grid">
          {templates.map(template => (
            <div key={template._id} className="template-card">
              <h3>{template.name}</h3>
              <div className="template-meta">
                <span>{formatDate(template.createdAt)}</span>
                <span>{template.blocks.length} blocks</span>
              </div>
              <div className="template-actions">
                <button
                  onClick={() => loadTemplate(template._id)}
                  className="btn-secondary"
                >
                  Edit
                </button>
                <button
                  onClick={() => startSharing(template._id)}
                  className="btn-secondary"
                >
                  Share
                </button>
                <button
                  onClick={() => deleteTemplate(template._id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>

              {/* Sharing form */}
              {sharingTemplateId === template._id && (
                <div className="share-form">
                  <h4>Share "{template.name}"</h4>
                  <div className="share-form-content">
                    <div className="form-group">
                      <label htmlFor={`recipient-${template._id}`}>Select Recipient:</label>
                      <select
                        id={`recipient-${template._id}`}
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        className="share-dropdown"
                        disabled={loadingUsers}
                      >
                        <option value="">-- Select a user --</option>
                        {loadingUsers ? (
                          <option value="">Loading users...</option>
                        ) : (
                          users.map(user => (
                            <option
                              key={user.id}
                              value={user.email}
                            >
                              {user.username} ({user.email})
                            </option>
                          ))
                        )}
                      </select>
                    </div>
                    <div className="share-form-buttons">
                      <button onClick={shareTemplate} className="btn-primary" disabled={loadingUsers || !recipientEmail}>
                        Share
                      </button>
                      <button onClick={cancelSharing} className="btn-secondary">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}