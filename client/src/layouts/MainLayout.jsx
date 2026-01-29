import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import '../index.css';

const MainLayout = () => {
    return (
        <div className="layout">
            <header className="header">
                <div className="container nav-container">
                    <Link to="/" className="logo">
                        {/* Placeholder for Logo if image fails */}
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
                    <Link to="/contact" className="btn btn-sm">Get in Touch</Link>
                </div>
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="footer" style={{ background: 'var(--primary-color)', color: '#fff', padding: '40px 0', marginTop: 'auto' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <p>&copy; {new Date().getFullYear()} Business Name. All rights reserved.</p>
                </div>
            </footer>

            <style>{`
        .header {
            background: #fff;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            position: sticky;
            top: 0;
            z-index: 1000;
            padding: 15px 0;
        }
        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .nav-list {
            display: flex;
            gap: 30px;
        }
        .nav-list a {
            font-weight: 500;
            color: var(--secondary-color);
        }
        .nav-list a:hover {
            color: var(--highlight-color);
        }
        .btn-sm {
            padding: 8px 16px;
            font-size: 0.9rem;
        }
      `}</style>
        </div>
    );
};

export default MainLayout;
