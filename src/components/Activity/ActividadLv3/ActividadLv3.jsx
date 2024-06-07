// ActividadLv3.jsx
import React from 'react';
/* import './actividad.css'; */

const ActividadLv3 = ({ mostrarActividad }) => {
  const handleVolver = () => {
    mostrarActividad(false);
  };

  return (
    <div className="actividad">
      <h2>Actividad Nivel 3</h2>
      <button onClick={handleVolver}>Volver</button>
    </div>
  );
};

export default ActividadLv3;
