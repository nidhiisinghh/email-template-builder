import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { templateAPI, shareAPI, authAPI } from '../utils/api';
import { useShare } from '../contexts/ShareContext';
import './SavedTemplates.css';

export default function SharedTemplates() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [sharedTemplates, setSharedTemplates] = useState({ sharedWithMe: [], sharedByMe: [] });
    const [activeTab, setActiveTab] = useState('sharedWithMe'); // 'sharedWithMe', 'sharedByMe'
    const navigate = useNavigate();

    useEffect(() => {
        fetchSharedTemplates();
    }, []);

    const fetchSharedTemplates = async () => {
        try {
            const response = await shareAPI.getSharedTemplates();
            setSharedTemplates(response.data);
        } catch (err) {
            setError('Failed to fetch shared templates');
            console.error('Failed to fetch shared templates:', err);
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

            // Remove from shared templates
            setSharedTemplates(prev => ({
                sharedWithMe: prev.sharedWithMe.filter(t => t._id !== templateId),
                sharedByMe: prev.sharedByMe.filter(t => t._id !== templateId)
            }));
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
                <div className="loading-container">Loading shared templates...</div>
            </div>
        );
    }

    return (
        <div className="template-history">
            <div className="history-header">
                <div>
                    <Link to="/app" className="back-link">← Back to Editor</Link>
                    <h1>Shared Templates</h1>
                </div>
                <button onClick={logout} className="btn-secondary">Logout</button>
            </div>

            {/* Tabs for different template views */}
            <div className="tabs-container">
                <button
                    className={`tab ${activeTab === 'sharedWithMe' ? 'active' : ''}`}
                    onClick={() => setActiveTab('sharedWithMe')}
                >
                    Shared With Me ({sharedTemplates.sharedWithMe.length})
                </button>
                <button
                    className={`tab ${activeTab === 'sharedByMe' ? 'active' : ''}`}
                    onClick={() => setActiveTab('sharedByMe')}
                >
                    Shared By Me ({sharedTemplates.sharedByMe.length})
                </button>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            {activeTab === 'sharedWithMe' && (
                sharedTemplates.sharedWithMe.length === 0 ? (
                    <div className="empty-history">
                        <p>No templates have been shared with you yet.</p>
                    </div>
                ) : (
                    <div className="templates-grid">
                        {sharedTemplates.sharedWithMe.map(template => (
                            <div key={template._id} className="template-card shared-template">
                                <h3>{template.name}</h3>
                                <div className="template-meta">
                                    <span>Shared by: {template.userId?.username || template.userId?.email}</span>
                                    <span>{formatDate(template.createdAt)}</span>
                                </div>
                                <div className="template-actions">
                                    <button
                                        onClick={() => loadTemplate(template._id)}
                                        className="btn-secondary"
                                    >
                                        View
                                    </button>
                                    <button
                                        onClick={() => deleteTemplate(template._id)}
                                        className="btn-danger"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}

            {activeTab === 'sharedByMe' && (
                sharedTemplates.sharedByMe.length === 0 ? (
                    <div className="empty-history">
                        <p>You haven't shared any templates yet.</p>
                    </div>
                ) : (
                    <div className="templates-grid">
                        {sharedTemplates.sharedByMe.map(template => (
                            <div key={template._id} className="template-card shared-by-me">
                                <h3>{template.name}</h3>
                                <div className="template-meta">
                                    <span>{formatDate(template.createdAt)}</span>
                                    <span>{template.blocks.length} blocks</span>
                                </div>
                                <div className="shared-with-info">
                                    <p>Shared with:</p>
                                    <ul>
                                        {template.sharedWith && template.sharedWith.length > 0 ? (
                                            template.sharedWith.map((share, index) => (
                                                <li key={index}>
                                                    {share.email} - {share.status}
                                                </li>
                                            ))
                                        ) : (
                                            <li>Nobody yet</li>
                                        )}
                                    </ul>
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
                )
            )}
        </div>
    );
}
