import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { templateAPI } from '../utils/api';
import './TemplateHistory.css';

export default function TemplateHistory() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const token = localStorage.getItem('token');
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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const logout = () => {
    localStorage.removeItem('token');
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
          <h1>Template History</h1>
        </div>
        <button onClick={logout} className="btn-secondary">Logout</button>
      </div>

      {error && <div className="error-message">{error}</div>}

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
                  onClick={() => deleteTemplate(template._id)}
                  className="btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}