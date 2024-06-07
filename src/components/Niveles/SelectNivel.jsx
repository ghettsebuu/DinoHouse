// SelectNivel.jsx
import React from 'react';
import './SelectNivel.css';

const SelectNivel = ({ seleccionarNivel }) => {
  const handleNivelSeleccionado = (nivel) => {
    seleccionarNivel(nivel);
  };

  return (
    <div className="select-nivel">
      <h2>Seleccionar Nivel</h2>
      <button onClick={() => handleNivelSeleccionado(1)}>Nivel 1</button>
      <button onClick={() => handleNivelSeleccionado(2)}>Nivel 2</button>
      <button onClick={() => handleNivelSeleccionado(3)}>Nivel 3</button>
      <button onClick={() => handleNivelSeleccionado(4)}>Nivel 4</button>
    </div>
  );
};

export default SelectNivel;
