// SelectNivel.jsx
import React from 'react';
import DinaImage from '../Inicio/DinaImage';
import TitoImage from '../Inicio/TitoImage';
import RexImage from '../Inicio/RexImage';
import AliImage from '../Inicio/AliImage';
import './SelectNivel.css';

const SelectNivel = ({ seleccionarNivel }) => {
  const handleNivelSeleccionado = (nivel) => {
    seleccionarNivel(nivel);
  };

  return (
    <div className="select-nivel">
      <h2>Seleccionar Nivel</h2>
      <div className="Botones" >
        <RexImage onClick={() => handleNivelSeleccionado(1)} />
        <DinaImage onClick={() => handleNivelSeleccionado(2)} />
        <TitoImage onClick={() => handleNivelSeleccionado(3)} />
        <AliImage onClick={() => handleNivelSeleccionado(4)} />
      </div>
      
    </div> 
  );
};

export default SelectNivel;
