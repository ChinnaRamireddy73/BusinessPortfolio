import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import '../index.css';

const AdminLayout = () => {
    const navigate = useNavigate();
    // Simple check
    const isAuthenticated = localStorage.getItem('adminAuth') === 'true';

    React.useEffect(() => {
        if (!isAuthenticated) {
            navigate('/admin/login');
        }
    }, [isAuthenticated, navigate]);

    if (!isAuthenticated) return null;

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        navigate('/admin/login');
    };

    return (
        <div className="admin-layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h3>Admin Panel</h3>
                </div>
                <nav className="sidebar-nav">
                    <ul>
                        <li><Link to="/admin/dashboard">Dashboard</Link></li>
                        <li><Link to="/admin/projects">Manage Projects</Link></li>
                        <li><Link to="/admin/clients">Manage Clients</Link></li>
                        <li><Link to="/admin/inquiries">Inquiries</Link></li>
                        <li><Link to="/admin/subscribers">Subscribers</Link></li>
                    </ul>
                </nav>
                <div className="sidebar-footer">
                    <button onClick={handleLogout} className="btn-logout">Logout</button>
                </div>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>

            <style>{`
        .admin-layout {
            display: flex;
            min-height: 100vh;
        }
        .sidebar {
            width: 250px;
            background: var(--primary-color);
            color: #fff;
            display: flex;
            flex-direction: column;
            padding: 20px;
        }
        .sidebar-header {
            margin-bottom: 40px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding-bottom: 20px;
        }
        .sidebar-nav ul {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        .sidebar-nav a {
            color: rgba(255,255,255,0.8);
            display: block;
            padding: 10px;
            border-radius: 5px;
        }
        .sidebar-nav a:hover {
            background: rgba(255,255,255,0.1);
            color: #fff;
        }
        .sidebar-footer {
            margin-top: auto;
            border-top: 1px solid rgba(255,255,255,0.1);
            padding-top: 20px;
        }
        .btn-logout {
            background: transparent;
            color: #ff6b6b;
            border: 1px solid #ff6b6b;
            width: 100%;
            padding: 10px;
            border-radius: 5px;
        }
        .btn-logout:hover {
            background: #ff6b6b;
            color: #fff;
        }
        .admin-content {
            flex: 1;
            padding: 40px;
            background: #f4f6f8;
        }
      `}</style>
        </div>
    );
};

export default AdminLayout;
