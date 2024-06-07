import React from 'react';
/* import './memoryGame.css'; */

const MemoryGameLv3 = ({ onNext }) => {
  const handleNext = () => {
    onNext();
  };

  return (
    <div className="memory-game">
      <h2>Memory Game Nivel 3</h2>
      {/* Aquí puedes agregar la lógica y los elementos del juego de memoria */}
      <button onClick={handleNext}>Volver</button>
    </div>
  );
};

export default MemoryGameLv3;
