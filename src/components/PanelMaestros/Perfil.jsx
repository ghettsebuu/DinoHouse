// Perfil.js
import React from 'react';
import { useAuth } from '../../Services/AuthContext';
import './Perfil.css';

function Perfil() {
  const { user } = useAuth();

  return (
    <div className='avatar-cardM'>
      <img src="/img/perfil/1.png" alt="Avatar" className="avatarM" />
      <div className="user-infoM">
        <div className="username-containerM">
          <p>{user ? user.displayName : "Nombre de Usuario"}</p>
        </div>
        <div className="level-containerM">
          <p>Sección A</p>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
