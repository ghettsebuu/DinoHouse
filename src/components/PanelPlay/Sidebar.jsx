// SidebarComponent.js
import React from 'react';
import HomeButtonComponent from './ButtonHome'; // Ajusta la ruta según la ubicación del archivo
import BackButtonComponent from './ButtonBack';
import './PanelPlay.css';

const SidebarComponent = ({ avatar, Nombre, level, mostrarSelectNivel }) => {
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
          <HomeButtonComponent />
          <BackButtonComponent />
      </div>
    </div>
  );
};

export default SidebarComponent;
