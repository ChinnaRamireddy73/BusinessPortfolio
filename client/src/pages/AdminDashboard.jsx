import React, { useEffect, useState } from 'react';
import api from '../api';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        projects: 0,
        clients: 0,
        inquiries: 0,
        subscribers: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Parallel fetching for performance
                const [projectsRes, clientsRes, inquiriesRes, subscribersRes] = await Promise.all([
                    api.get('/projects'),
                    api.get('/clients'),
                    api.get('/contact'),
                    api.get('/subscribe')
                ]);

                setStats({
                    projects: projectsRes.data.length,
                    clients: clientsRes.data.length,
                    inquiries: inquiriesRes.data.length,
                    subscribers: subscribersRes.data.length
                });
            } catch (err) {
                console.error("Error fetching stats:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="fade-in">Loading dashboard...</div>;

    return (
        <div className="fade-in">
            <div className="admin-stats-grid">
                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#4a90e2' }}>
                        📁
                    </div>
                    <div className="stat-info">
                        <h3>{stats.projects}</h3>
                        <p>Total Projects</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#50e3c2' }}>
                        👥
                    </div>
                    <div className="stat-info">
                        <h3>{stats.clients}</h3>
                        <p>Total Clients</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#f5a623' }}>
                        ✉️
                    </div>
                    <div className="stat-info">
                        <h3>{stats.inquiries}</h3>
                        <p>Contact Forms</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon" style={{ background: '#bd10e0' }}>
                        📬
                    </div>
                    <div className="stat-info">
                        <h3>{stats.subscribers}</h3>
                        <p>Subscribers</p>
                    </div>
                </div>
            </div>

            <div style={{ background: '#fff', padding: 24, borderRadius: 8, boxShadow: 'var(--shadow-sm)' }}>
                <h3>Quick Actions</h3>
                <p>Select an option from the sidebar to manage your content.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
