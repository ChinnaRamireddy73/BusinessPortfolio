import React, { useEffect, useState } from 'react';
import api from '../api';

const ManageClients = () => {
    const [clients, setClients] = useState([]);
    const [formData, setFormData] = useState({ name: '', designation: '', description: '' });
    const [image, setImage] = useState(null);
    const [editId, setEditId] = useState(null);

    const fetchClients = async () => {
        try {
            const res = await api.get('/clients');
            setClients(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('designation', formData.designation);
        data.append('description', formData.description);
        if (image) data.append('image', image);

        try {
            if (editId) {
                await api.put(`/clients/${editId}`, data);
            } else {
                await api.post('/clients', data);
            }
            setFormData({ name: '', designation: '', description: '' });
            setImage(null);
            setEditId(null);
            fetchClients();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (client) => {
        setFormData({ name: client.name, designation: client.designation, description: client.description });
        setEditId(client._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/clients/${id}`);
                fetchClients();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="manage-page">
            <h2>Manage Clients</h2>

            <form onSubmit={handleSubmit} className="admin-form">
                <input type="text" name="name" placeholder="Client Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="designation" placeholder="Designation" value={formData.designation} onChange={handleChange} required />
                <textarea name="description" placeholder="Description/Testimonial" value={formData.description} onChange={handleChange} required />
                <input type="file" onChange={handleImageChange} accept="image/*" />
                <button type="submit" className="btn">{editId ? 'Update Client' : 'Add Client'}</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setFormData({ name: '', designation: '', description: '' }); }} className="btn btn-cancel">Cancel Edit</button>}
            </form>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Designation</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client._id}>
                                <td>
                                    <img src={`http://localhost:5000${client.image}`} alt={client.name} width="50" style={{ borderRadius: '50%' }} />
                                </td>
                                <td>{client.name}</td>
                                <td>{client.designation}</td>
                                <td>{client.description.substring(0, 30)}...</td>
                                <td>
                                    <button onClick={() => handleEdit(client)} className="btn-icon">Edit</button>
                                    <button onClick={() => handleDelete(client._id)} className="btn-icon btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <style>{`
                /* Styles shared from ManageProjects via index.css or copied if scoped */
                .manage-page { max-width: 800px; }
                .admin-form { display: flex; flex-direction: column; gap: 15px; background: #fff; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
                .admin-form input, .admin-form textarea { padding: 10px; border: 1px solid #ddd; border-radius: 4px; }
                .table-container { background: #fff; padding: 20px; border-radius: 8px; }
                .admin-table { width: 100%; border-collapse: collapse; }
                .admin-table th, .admin-table td { padding: 15px; border-bottom: 1px solid #eee; text-align: left; }
                .btn-icon { background: none; border: none; color: var(--secondary-color); font-size: 0.9rem; margin-right: 10px; text-decoration: underline; }
                .btn-delete { color: #ff6b6b; }
                .btn-cancel { background: #999; margin-left: 10px; }
            `}</style>
        </div>
    );
};

export default ManageClients;
