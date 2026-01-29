import React from 'react';

const ClientCard = ({ client }) => {
    return (
        <div className="client-card">
            <div className="client-image">
                <img
                    src={`http://localhost:5000${client.image}`}
                    alt={client.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/placeholder-client.svg'; }}
                />
            </div>
            <div className="client-content">
                <p className="client-quote">"{client.description}"</p>
                <h4>{client.name}</h4>
                <span className="client-designation">{client.designation}</span>
            </div>
        </div>
    );
};

export default ClientCard;
