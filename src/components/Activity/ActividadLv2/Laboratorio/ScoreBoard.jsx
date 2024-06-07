// src/components/LaboratorioSilabas/ScoreBoard.js
import React from 'react';
import './ScoreBoard.css';

const ScoreBoard = ({ score }) => {
  return (
    <div className="score-board">
      <h2>Puntuación: {score}</h2>
    </div>
  );
};

export default ScoreBoard;

