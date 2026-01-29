import React, { useEffect, useState } from 'react';
import api from '../api';

const ViewInquiries = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const res = await api.get('/contact');
                setContacts(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchContacts();
    }, []);

    return (
        <div className="manage-page">
            <h2>Contact Inquiries</h2>
            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>City</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact._id}>
                                <td>{contact.fullName}</td>
                                <td>{contact.email}</td>
                                <td>{contact.mobile}</td>
                                <td>{contact.city}</td>
                                <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <style>{`
                .manage-page { max-width: 1000px; }
                .table-container { background: #fff; padding: 20px; border-radius: 8px; }
                .admin-table { width: 100%; border-collapse: collapse; }
                .admin-table th, .admin-table td { padding: 15px; border-bottom: 1px solid #eee; text-align: left; }
            `}</style>
        </div>
    );
};

export default ViewInquiries;
