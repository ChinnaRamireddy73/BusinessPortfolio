import React, { useState } from 'react';
import api from '../api';

const Newsletter = () => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
            await api.post('/subscribe', { email });
            setStatus('success');
            setEmail('');
        } catch (err) {
            console.error(err);
            setStatus('error');
        }
    };

    return (
        <div className="newsletter-box">
            <form onSubmit={handleSubmit} className="newsletter-form">
                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="newsletter-input"
                />
                <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
                    Subscribe
                </button>
            </form>
            {status === 'success' && <p style={{ marginTop: '10px' }}>Thank you for subscribing!</p>}
            {status === 'error' && <p style={{ marginTop: '10px', color: '#ffcccc' }}>Subscription failed or already subscribed.</p>}
        </div>
    );
};

export default Newsletter;
