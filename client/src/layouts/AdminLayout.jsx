import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import '../index.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    const isAuthenticated = !!localStorage.getItem('token');

    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/admin/login');
    };

    const handleViewSite = () => {
        window.open('/', '_blank');
    };

    const handleRefresh = () => {
        window.location.reload();
    };

    return (
        <div className="admin-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h3>Admin Panel</h3>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Dashboard</NavLink></li>
                        <li><NavLink to="/admin/projects" className={({ isActive }) => isActive ? 'active' : ''}>Manage Projects</NavLink></li>
                        <li><NavLink to="/admin/clients" className={({ isActive }) => isActive ? 'active' : ''}>Manage Clients</NavLink></li>
                        <li><NavLink to="/admin/inquiries" className={({ isActive }) => isActive ? 'active' : ''}>Inquiries</NavLink></li>
                        <li><NavLink to="/admin/subscribers" className={({ isActive }) => isActive ? 'active' : ''}>Subscribers</NavLink></li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                </div>
            </aside>
            <main className="admin-main">
                <header className="admin-topbar">
                    <h2 className="page-title">Management Console</h2>
                    <div className="topbar-actions">
                        <button onClick={handleViewSite} className="btn-sm btn-secondary">View Site</button>
                        <button onClick={handleRefresh} className="btn-sm btn-secondary">Refresh</button>
                    </div>
                </header>
                <div className="admin-content-wrapper">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
