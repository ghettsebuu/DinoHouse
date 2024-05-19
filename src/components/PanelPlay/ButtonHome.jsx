import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PanelPlay.css';

const HomeButtonComponent = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  return (
    <button onClick={goToHome} className="home-button">
      <i className="fa-solid fa-house"></i>
    </button>
  );
};

export default HomeButtonComponent;
