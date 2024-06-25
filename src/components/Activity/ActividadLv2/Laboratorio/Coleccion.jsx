import React from 'react';
import './Coleccion.css';

const Coleccion = ({ formedSyllables, currentLevel, onBack }) => {
  return (
    <div className="coleccion">
      <div className='coleccion-top'>
        <button className='BotonAtras' onClick={onBack}>
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <div className='titulo'>
          <h3>Mi colección</h3>  
        </div>
      </div>
      
      <div className="silabas">
        {formedSyllables[currentLevel].length === 0 ? (
          <p>No has descubierto ninguna sílaba aún.</p>
        ) : (
          <div className="silabas-grid">
            {formedSyllables[currentLevel].map((syllable, index) => (
              <div key={index} className="sylaba">
                {syllable}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Coleccion;
