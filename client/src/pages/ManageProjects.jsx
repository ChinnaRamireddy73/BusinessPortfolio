import React, { useEffect, useState } from 'react';
import api from '../api';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ name: '', description: '', link: '' });
    const [image, setImage] = useState(null);
    const [editId, setEditId] = useState(null);

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchProjects();
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
        data.append('description', formData.description);
        data.append('link', formData.link);
        if (image) data.append('image', image);

        try {
            if (editId) {
                await api.put(`/projects/${editId}`, data);
            } else {
                await api.post('/projects', data);
            }
            setFormData({ name: '', description: '', link: '' });
            setImage(null);
            setEditId(null);
            fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (project) => {
        setFormData({ name: project.name, description: project.description, link: project.link || '' });
        setEditId(project._id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure?')) {
            try {
                await api.delete(`/projects/${id}`);
                fetchProjects();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div className="manage-page">
            <h2>Manage Projects</h2>

            <form onSubmit={handleSubmit} className="admin-form">
                <input type="text" name="name" placeholder="Project Name" value={formData.name} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input type="text" name="link" placeholder="Project Link (Optional)" value={formData.link} onChange={handleChange} />
                <input type="file" onChange={handleImageChange} accept="image/*" />
                <button type="submit" className="btn">{editId ? 'Update Project' : 'Add Project'}</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setFormData({ name: '', description: '', link: '' }); }} className="btn btn-cancel">Cancel Edit</button>}
            </form>

            <div className="table-container">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project._id}>
                                <td>
                                    <img src={`http://localhost:5000${project.image}`} alt={project.name} width="50" />
                                </td>
                                <td>{project.name}</td>
                                <td>{project.description.substring(0, 50)}...</td>
                                <td>
                                    <button onClick={() => handleEdit(project)} className="btn-icon">Edit</button>
                                    <button onClick={() => handleDelete(project._id)} className="btn-icon btn-delete">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <style>{`
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

export default ManageProjects;
