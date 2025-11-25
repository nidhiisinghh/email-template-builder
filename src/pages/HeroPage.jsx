import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../utils/api';
import './HeroPage.css';

export default function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        await authAPI.getProfile();
        navigate('/app');
      } catch (err) {
        console.error('Token validation failed:', err);
        navigate('/auth');
      }
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="hero-page">
      <div className="navbar">
        <div className="nav-content">
          <div className="logo">
            <span className="logo-icon">✉️</span>
            <span>EmailBuilder</span>
          </div>
          <div className="nav-links">
            <a href="#features">Features</a>
          </div>
        </div>
      </div>
      
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <div className="badge">NEW</div>
            <h1 className="hero-title">
              Design stunning emails — <span className="gradient-text">fast</span>.
            </h1>
            <p className="hero-subtitle">
              Build responsive, pixel-perfect email templates with simple drag-and-drop blocks.
            </p>
            
            <div className="hero-cta-group">
              <button className="btn-primary large" onClick={handleGetStarted}>
                Get started
              </button>
            </div>
            
            <div className="trust-badges">
              <span>Built for designers, marketers & founders</span>
              <span className="dot">•</span>
              <span>Always free</span>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="browser-mockup">
              <div className="browser-header">
                <div className="dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="address-bar">app.emailbuilder.com</div>
              </div>
              <div className="app-preview">
                <div className="sidebar">
                  <div className="tool-item"></div>
                  <div className="tool-item"></div>
                  <div className="tool-item"></div>
                  <div className="tool-item"></div>
                </div>
                <div className="canvas-preview">
                  <div className="email-block header"></div>
                  <div className="email-block hero"></div>
                  <div className="email-block text"></div>
                  <div className="email-block text"></div>
                  <div className="email-block button"></div>
                  
                  <div className="floating-card card-1">
                    <span>🎨</span>
                    <span>Drag & Drop</span>
                  </div>
                  <div className="floating-card card-2">
                    <span>⚡</span>
                    <span>Instant Preview</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="features-section" id="features">
        <div className="section-header">
          <h2>Powerful features for modern email design</h2>
          <p>Built for designers, marketers, and developers who want to create beautiful emails without coding.</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>Visual Builder</h3>
            <p>Drag and drop interface with real-time preview. No coding required.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive</h3>
            <p>Mobile-friendly templates that look great on any device.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Export clean HTML in seconds with perfect rendering.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Reusable</h3>
            <p>Save templates and components for future use.</p>
          </div>
        </div>
        
        {/* Add navigation back to top */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <a href="/" className="btn-secondary" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Back to main page
          </a>
        </div>
      </section>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <span className="logo-icon">✉️</span>
              <span>EmailBuilder</span>
            </div>
            <p>Create beautiful, responsive email templates without writing code.</p>
          </div>
          
          <div className="footer-links">
            <div className="link-group">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="/">Back to main page</a>
            </div>
            
            <div className="link-group">
              <h4>Resources</h4>
              <a href="#">Documentation</a>
              <a href="#">Tutorials</a>
              <a href="#">Blog</a>
            </div>
            
            <div className="link-group">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Careers</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
