import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../utils/api';
import { useShare } from '../contexts/ShareContext';
import '../App.css';
import './HeroPage.css';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { fetchPendingShares } = useShare();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = isLogin
        ? await authAPI.login(formData)
        : await authAPI.register(formData);

      localStorage.setItem('token', response.data.token);
      await fetchPendingShares(); // Fetch shares immediately after login
      navigate('/app');
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'An error occurred');
      } else {
        setError('Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hero-page" style={{ minHeight: '100vh', padding: '0' }}>

      <div className="navbar">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">✉️</span>
            <span>EmailBuilder</span>
          </div>
          <div className="nav-links">
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 'calc(100vh - 80px)',
        padding: '2rem'
      }}>
        <div className="auth-container" style={{ maxWidth: '450px', width: '100%' }}>
          <div className="auth-header">
            <h1>{isLogin ? 'Welcome back' : 'Create account'}</h1>
            <p>
              {isLogin
                ? 'Sign in to continue to your email templates.'
                : 'Join us to start creating beautiful emails.'}
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="Enter your username"
                  className="form-control"
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength="6"
                placeholder="Enter your password"
                className="form-control"
              />
            </div>

            <button type="submit" className="btn-primary large" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
              {loading ? 'Loading...' : (isLogin ? 'Sign in' : 'Create account')}
            </button>
          </form>

          <div className="auth-toggle">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={() => setIsLogin(!isLogin)} className="auth-toggle-btn">
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}