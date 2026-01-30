import React from 'react';

const ClientCard = ({ client }) => {
  return (
    <div className="client-card">
      <div className="client-image">
        <img
          src={client.image}
          alt={client.name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.display = 'none';
          }}
        />
      </div>
      <div className="client-content">
        <p className="client-quote">&quot;{client.description}&quot;</p>
        <h4>{client.name}</h4>
        <span className="client-designation">{client.designation}</span>
      </div>
    </div>
  );
};

export default ClientCard;
