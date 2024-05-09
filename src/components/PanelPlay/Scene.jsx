import React, { useState } from 'react';
import './PanelPlay.css';
import Nivel1 from '../Niveles/Nivel1.jsx';
import ActividadLv1 from '../Activity/ActividadLv1/ActividadLv1.jsx';

const SceneComponent = () => {
  const [mostrarActividad, setMostrarActividad] = useState(false);

  const handleMostrarActividad = () => {
    setMostrarActividad(true);
  };

  return (
    <div className="scene">
      {!mostrarActividad ? (
        <Nivel1 mostrarActividad={handleMostrarActividad} />
      ) : (
        <ActividadLv1 mostrarActividad={setMostrarActividad} />
      )}
    </div>
  );
};

export default SceneComponent;
