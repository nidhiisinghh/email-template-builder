import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HeroPage.css';

export default function Hero() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Always redirect to auth page - no automatic login
    navigate('/auth');
  };

  return (
    <header className="hero-root" role="banner">
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 className="hero-title">Design stunning emails — fast.</h1>
          <p className="hero-sub">
            A modern, visual email template builder with block-based editing and pixel-perfect
            output.
          </p>

          <div className="hero-ctas">
            <button className="btn btn-primary" onClick={handleGetStarted} aria-label="Get started — go to app">
              Get started
            </button>
            <a className="btn btn-ghost" href="#features" aria-label="See features">
              See features
            </a>
          </div>
        </div>

        <div className="hero-preview" aria-hidden="true">
          <div className="device">
            <div className="email-mock">
              <div className="email-header">Newsletter — Nov edition</div>
              <div className="email-body">
                <h3>Launch update</h3>
                <p>Ship faster with visual blocks, reusable components, and responsive controls.</p>
              </div>
              <div className="email-cta">Open in builder →</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}