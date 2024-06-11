// src/components/SidebarComponent.js
import React from 'react';
import HomeButtonComponent from './ButtonHome';
import ExitButtonComponent from './ButtonExit';
import BackButtonComponent from './ButtonBack';
import './PanelPlay.css';

const SidebarComponent = ({ avatar, Nombre, level, mostrarSelectNivel, onBackButtonClick }) => {
  const handleMostrarSelectNivel = () => {
    mostrarSelectNivel();
  };

  return (
    <div className="sidebar">
      <div className="avatar-card">
        <img src={avatar} alt="Avatar" className="avatar" />
        <div className="user-info">
          <div className="username-container">
            <p>{Nombre}</p>
          </div>
          <div className="level-container" onClick={handleMostrarSelectNivel}>
            <p>Nivel: {level}</p> 
          </div>
        </div>
      </div>
      <div className="button-container">
          <BackButtonComponent onClick={onBackButtonClick} />
          <HomeButtonComponent />
          <ExitButtonComponent />
      </div>
    </div>
  );
};

export default SidebarComponent;
