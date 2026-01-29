import React, { useEffect, useState } from 'react';
import api from '../api';
import Modal from '../components/Modal';
import { useToast } from '../context/ToastContext';

const ManageClients = () => {
    const [clients, setClients] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentClient, setCurrentClient] = useState(null);
    const [clientToDelete, setClientToDelete] = useState(null);

    // Form State
    const [formData, setFormData] = useState({ name: '', designation: '', description: '' });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const { addToast } = useToast();

    const fetchClients = async () => {
        try {
            const res = await api.get('/clients');
            setClients(res.data);
        } catch (err) {
            console.error(err);
            addToast('Failed to load clients', 'error');
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const resetForm = () => {
        setFormData({ name: '', designation: '', description: '' });
        setImage(null);
        setPreview(null);
        setCurrentClient(null);
        setIsModalOpen(false);
    };

    const handleOpenAdd = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const handleOpenEdit = (client) => {
        setCurrentClient(client);
        setFormData({
            name: client.name,
            designation: client.designation,
            description: client.description
        });
        setPreview(`http://localhost:5000${client.image}`);
        setImage(null);
        setIsModalOpen(true);
    };

    const handleOpenDelete = (client) => {
        setClientToDelete(client);
        setIsDeleteModalOpen(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData();
        data.append('name', formData.name);
        data.append('designation', formData.designation);
        data.append('description', formData.description);
        if (image) data.append('image', image);

        try {
            if (currentClient) {
                await api.put(`/clients/${currentClient._id}`, data);
                addToast('Client updated successfully', 'success');
            } else {
                await api.post('/clients', data);
                addToast('Client created successfully', 'success');
            }
            fetchClients();
            resetForm();
        } catch (err) {
            console.error(err);
            addToast('Operation failed', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!clientToDelete) return;
        try {
            await api.delete(`/clients/${clientToDelete._id}`);
            addToast('Client deleted successfully', 'success');
            fetchClients();
            setIsDeleteModalOpen(false);
            setClientToDelete(null);
        } catch (err) {
            console.error(err);
            addToast('Failed to delete client', 'error');
        }
    };

    return (
        <div className="manage-page fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2>Manage Clients</h2>
                <button onClick={handleOpenAdd} className="btn">Add New Client</button>
            </div>

            <div className="table-container">
                <table>
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
                        {clients.length > 0 ? clients.map(client => (
                            <tr key={client._id}>
                                <td>
                                    <img
                                        src={`http://localhost:5000${client.image}`}
                                        alt={client.name}
                                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '50%' }}
                                    />
                                </td>
                                <td>{client.name}</td>
                                <td>{client.designation}</td>
                                <td>{client.description.substring(0, 30)}...</td>
                                <td className="actions-cell">
                                    <button onClick={() => handleOpenEdit(client)} className="btn-icon">
                                        ✏️
                                    </button>
                                    <button onClick={() => handleOpenDelete(client)} className="btn-icon delete">
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: 'center', color: '#999' }}>No clients found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentClient ? 'Edit Client' : 'Add New Client'}
            >
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label>Client Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Designation</label>
                        <input type="text" name="designation" value={formData.designation} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Testimonial / Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Client Image</label>
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                        {preview && (
                            <div style={{ marginTop: 10 }}>
                                <img src={preview} alt="Preview" style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: '50%', margin: '0 auto', display: 'block' }} />
                            </div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-block" disabled={loading}>
                        {loading ? 'Saving...' : (currentClient ? 'Update Client' : 'Create Client')}
                    </button>
                </form>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Confirm Delete"
            >
                <div style={{ textAlign: 'center' }}>
                    <p style={{ marginBottom: 20 }}>
                        Are you sure you want to delete <strong>{clientToDelete?.name}</strong>?
                    </p>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                        <button onClick={() => setIsDeleteModalOpen(false)} className="btn btn-secondary">Cancel</button>
                        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ManageClients;
