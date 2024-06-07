import React from 'react';
/* import './memoryGame.css'; */

const MemoryGameLv2 = ({ onNext }) => {
  const handleNext = () => {
    onNext();
  };

  return (
    <div className="memory-game">
      <h2>Memory Game Nivel 2</h2>
      {/* Aquí puedes agregar la lógica y los elementos del juego de memoria */}
      <button onClick={handleNext}>Volver</button>
    </div>
  );
};

export default MemoryGameLv2;
