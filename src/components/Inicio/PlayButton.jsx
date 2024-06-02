// PlayButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlayButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const studentName = localStorage.getItem('studentName');
    
    if (studentName) {
      // Si hay un estudiante logueado, redirige a PanelPlay
      navigate('/PanelPlay');
    } else {
      // Si no, redirige a SelectLogin
      navigate('/SelectLogin');
    }
  };

  return (
    <button onClick={handleClick} className="play-button">
      <i className="fa-solid fa-play"></i>
    </button>
  );
};

export default PlayButton;
