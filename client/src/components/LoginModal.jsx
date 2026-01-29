import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Modal from './Modal';
import { useToast } from '../context/ToastContext';

const LoginModal = ({ isOpen, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { addToast } = useToast();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', res.data.token);
            addToast('Login Successful! Redirecting...', 'success');
            onClose();
            navigate('/admin/dashboard');
        } catch (err) {
            addToast(err.response?.data?.message || 'Invalid credentials', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Admin Access">
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label>Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="admin@business.com"
                    />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="••••••••"
                    />
                </div>
                <button type="submit" className="btn btn-block" disabled={isLoading}>
                    {isLoading ? 'Verifying...' : 'Secure Login'}
                </button>
            </form>
            <div style={{ marginTop: '15px', textAlign: 'center', fontSize: '0.8rem', color: '#888' }}>
                <p>Authorized Personnel Only</p>
            </div>
        </Modal>
    );
};

export default LoginModal;
