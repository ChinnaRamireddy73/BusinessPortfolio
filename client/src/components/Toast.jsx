import React from 'react';

const Toast = ({ message, type, onClose }) => {
    return (
        <div className={`toast toast-${type}`}>
            <span className="toast-message">{message}</span>
            <button className="toast-close" onClick={onClose}>&times;</button>
        </div>
    );
};

export default Toast;
