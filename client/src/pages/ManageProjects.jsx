import React, { useEffect, useState } from 'react';
import api from '../api';
import Modal from '../components/Modal';
import { useToast } from '../context/ToastContext';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [projectToDelete, setProjectToDelete] = useState(null);

    // Form State
    const [formData, setFormData] = useState({ name: '', description: '', link: '' });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const { addToast } = useToast();

    const fetchProjects = async () => {
        try {
            const res = await api.get('/projects');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
            addToast('Failed to load projects', 'error');
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const resetForm = () => {
        setFormData({ name: '', description: '', link: '' });
        setImage(null);
        setPreview(null);
        setCurrentProject(null);
        setIsModalOpen(false);
    };

    const handleOpenAdd = () => {
        resetForm();
        setIsModalOpen(true);
    };

    const handleOpenEdit = (project) => {
        setCurrentProject(project);
        setFormData({
            name: project.name,
            description: project.description,
            link: project.link || ''
        });
        setPreview(`http://localhost:5000${project.image}`);
        setImage(null);
        setIsModalOpen(true);
    };

    const handleOpenDelete = (project) => {
        setProjectToDelete(project);
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
        data.append('description', formData.description);
        data.append('link', formData.link);
        if (image) data.append('image', image);

        try {
            if (currentProject) {
                await api.put(`/projects/${currentProject._id}`, data);
                addToast('Project updated successfully', 'success');
            } else {
                await api.post('/projects', data);
                addToast('Project created successfully', 'success');
            }
            fetchProjects();
            resetForm();
        } catch (err) {
            console.error(err);
            addToast('Operation failed. Please try again.', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!projectToDelete) return;
        try {
            await api.delete(`/projects/${projectToDelete._id}`);
            addToast('Project deleted successfully', 'success');
            fetchProjects();
            setIsDeleteModalOpen(false);
            setProjectToDelete(null);
        } catch (err) {
            console.error(err);
            addToast('Failed to delete project', 'error');
        }
    };

    return (
        <div className="manage-page fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h2>Manage Projects</h2>
                <button onClick={handleOpenAdd} className="btn">Add New Project</button>
            </div>

            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.length > 0 ? projects.map(project => (
                            <tr key={project._id}>
                                <td>
                                    <img
                                        src={`http://localhost:5000${project.image}`}
                                        alt={project.name}
                                        style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4 }}
                                    />
                                </td>
                                <td>{project.name}</td>
                                <td>{project.description.substring(0, 50)}...</td>
                                <td className="actions-cell">
                                    <button onClick={() => handleOpenEdit(project)} className="btn-icon">
                                        ✏️
                                    </button>
                                    <button onClick={() => handleOpenDelete(project)} className="btn-icon delete">
                                        🗑️
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center', color: '#999' }}>No projects found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={currentProject ? 'Edit Project' : 'Add New Project'}
            >
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label>Project Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} required />
                    </div>

                    <div className="form-group">
                        <label>Project Link</label>
                        <input type="text" name="link" value={formData.link} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Project Image</label>
                        <input type="file" onChange={handleImageChange} accept="image/*" />
                        {preview && (
                            <div style={{ marginTop: 10 }}>
                                <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', borderRadius: 6 }} />
                            </div>
                        )}
                    </div>

                    <button type="submit" className="btn btn-block" disabled={loading}>
                        {loading ? 'Saving...' : (currentProject ? 'Update Project' : 'Create Project')}
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
                        Are you sure you want to delete <strong>{projectToDelete?.name}</strong>? This action cannot be undone.
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

export default ManageProjects;
