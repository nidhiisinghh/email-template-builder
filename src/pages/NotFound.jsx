import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="not-found-container" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: 'var(--bg-dark)',
            color: 'white',
            textAlign: 'center',
            padding: '20px'
        }}>
            <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--accent-blue)' }}>404</h1>
            <h2 style={{ fontSize: '2rem', marginBottom: '2rem' }}>This URL does not exist</h2>
            <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
