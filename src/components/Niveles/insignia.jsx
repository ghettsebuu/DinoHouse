// src/components/Insignia/Insignia.jsx
import React from 'react';
import './Insignia.css';

const Insignia = ({ level, puntos }) => {
  const insigniaVisible = puntos >= 1000;

  return (
    <div className="insignia-container">
      {insigniaVisible && (
        <img
          src={`/img/insignia-level${level}.png`}
          alt={`Insignia Level ${level}`}
          className="insignia"
        />
      )}
    </div>
  );
};

export default Insignia;
