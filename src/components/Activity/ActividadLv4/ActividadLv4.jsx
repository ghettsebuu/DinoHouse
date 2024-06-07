// ActividadLv4.jsx
import React from 'react';
/* import './actividad.css'; */

const ActividadLv4 = ({ mostrarActividad }) => {
  const handleVolver = () => {
    mostrarActividad(false);
  };

  return (
    <div className="actividad">
      <h2>Actividad Nivel 4</h2>
      <button onClick={handleVolver}>Volver</button>
    </div>
  );
};

export default ActividadLv4;
