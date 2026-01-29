import React, { useEffect, useState } from 'react';
import api from '../api';

const ViewSubscribers = () => {
    const [subscribers, setSubscribers] = useState([]);

    useEffect(() => {
        const fetchSubscribers = async () => {
            try {
                const res = await api.get('/subscribe');
                setSubscribers(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchSubscribers();
    }, []);

    return (
        <div className="manage-page">
            <h2>Newsletter Subscribers</h2>
            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Date Subscribed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subscribers.map(sub => (
                            <tr key={sub._id}>
                                <td>{sub.email}</td>
                                <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <style>{`
                .manage-page { max-width: 800px; }
                .table-container { background: #fff; padding: 20px; border-radius: 8px; }
                .admin-table { width: 100%; border-collapse: collapse; }
                .admin-table th, .admin-table td { padding: 15px; border-bottom: 1px solid #eee; text-align: left; }
            `}</style>
        </div>
    );
};

export default ViewSubscribers;
