import React from 'react';

const ProjectCard = ({ project }) => {
    return (
        <div className="project-card">
            <div className="project-image">
                <img
                    src={`http://localhost:5000${project.image}`}
                    alt={project.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/placeholder.svg'; }}
                />
            </div>
            <div className="project-content">
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <button className="btn btn-outline" disabled style={{ cursor: 'not-allowed', opacity: 0.7 }}>Read More</button>
            </div>
        </div>
    );
};

export default ProjectCard;
