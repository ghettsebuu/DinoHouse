// src/components/SidebarComponent.js
import React from 'react';
import HomeButtonComponent from './ButtonHome';
import ExitButtonComponent from './ButtonExit';
import BackButtonComponent from './ButtonBack';
import './PanelPlay.css';

const SidebarComponent = ({ avatar, Nombre, level, mostrarSelectNivel, onBackButtonClick, hidden,buttonhidden }) => {
  const handleMostrarSelectNivel = () => {
    mostrarSelectNivel();
  };

  return (
    <div className="sidebar">
      <div className={`avatar-card ${hidden}`}>
        <img src="/img/perfil/1.png" alt="Avatar" className="avatar" />
        <div className="user-info">
          <div className="username-container"> 
            <p>{Nombre}</p>
          </div>
          <div className="level-container" onClick={handleMostrarSelectNivel}>
            <p>Nivel: {level}</p> 
          </div>
        </div>
      </div>
      <div className={`button-container ${buttonhidden}`}>
          <BackButtonComponent onClick={onBackButtonClick} />
          <HomeButtonComponent />
          <ExitButtonComponent />
      </div>
    </div>
  );
};

export default SidebarComponent;
