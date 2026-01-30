import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../index.css';
import LoginModal from '../components/LoginModal';

const MainLayout = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    return (
        <div className="layout">
            <header className="header">
                <div className="container nav-container">
                    <Link to="/" className="logo">
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>BusinessPortfolio</span>
                    </Link>
                    <nav className="nav">
                        <ul className="nav-list">
                            <li><Link to="/">Home</Link></li>
                            <li><a href="#projects">Projects</a></li>
                            <li><a href="#clients">Clients</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </nav>
                </div>
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="footer" style={{ background: 'var(--primary-color)', color: '#fff', padding: '40px 0', marginTop: 'auto' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <p>&copy; {new Date().getFullYear()} Business Name. All rights reserved.</p>
                    <button
                        onClick={() => setIsLoginOpen(true)}
                        className="admin-footer-btn"
                        style={{ marginTop: '20px' }}
                        title="Admin Access"
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        Admin Login
                    </button>
                </div>
            </footer>

            <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
        </div>
    );
};

export default MainLayout;
