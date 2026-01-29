import React from 'react';

const ProjectCard = ({ project }) => {
  return (
    <div className="cinematic-card">
      <div className="cinematic-image-wrapper">
        <img
          src={`http://localhost:5000${project.image}`}
          alt={project.name}
          className="cinematic-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none'; // Basic fallback for broken images
          }}
        />
      </div>
      <div className="cinematic-overlay">
        <h3 className="cinematic-title">{project.name}</h3>
        <p className="cinematic-desc">{project.description}</p>
        <span className="cinematic-btn">Read More</span>
      </div>
    </div>
  );
};

export default ProjectCard;
