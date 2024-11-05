import React from 'react';
import './MSModal.css'; // Ensure this CSS file is created

const MSModal = ({ show, onClose, title, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default MSModal;
