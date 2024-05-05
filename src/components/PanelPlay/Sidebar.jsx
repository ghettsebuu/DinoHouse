// SidebarComponent.js
import React from 'react';
import HomeButtonComponent from './ButtonHome'; // Ajusta la ruta según la ubicación del archivo
import BackButtonComponent from './ButtonBack';
import './PanelPlay.css';

const SidebarComponent = ({ avatar, username, level }) => {
  return (
    <div className="sidebar">
      <div className="avatar-card">
        <img src={avatar} alt="Avatar" className="avatar" />
        <div className="user-info">
          <div className="username-container">
            <p>{username}</p>
          </div>
          <div className="level-container">
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
