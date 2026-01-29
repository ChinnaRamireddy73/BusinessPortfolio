import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { useToast } from '../context/ToastContext';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // We can use the toast context here if we wrapped the whole app including routes, 
    // but usually Login is outside authenticated layout. 
    // Assuming ToastProvider wraps everything in main.jsx, we can use it.
    const { addToast } = useToast();

    // Quick Seed function for demo purposes (Development only)
    const handleSeed = async () => {
        try {
            await api.post('/auth/seed', { email, password });
            addToast('Admin created! Now login.', 'success');
        } catch (err) {
            addToast(err.response?.data?.message || 'Error creating admin', 'error');
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            addToast('Login successful', 'success');
            navigate('/admin/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid credentials');
            addToast(err.response?.data?.message || 'Login failed', 'error');
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card fade-in">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="admin-login-btn">Login to Dashboard</button>
                </form>
                {error && <p className="error-msg">{error}</p>}

                <div style={{ marginTop: 30, paddingTop: 20, borderTop: '1px solid #eee' }}>
                    <p style={{ fontSize: '0.85rem', color: '#999', marginBottom: 10 }}>First time setup?</p>
                    <button onClick={handleSeed} style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', textDecoration: 'underline', fontSize: '0.85rem' }}>Create Admin Account</button>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
