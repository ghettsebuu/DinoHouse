import React from 'react';
import { UserAuth } from '../../Services/AuthContext';
import './Perfil.css'


function Perfil() {
  const {user} =UserAuth();
 

  return (
   <div className='avatar-cardM'>
        <img src="/img/perfil/1.png" alt="Avatar" className="avatarM" />
        <div className="user-infoM">
          <div className="username-containerM">
            <p>{user.displayName}</p>
          </div>
          <div className="level-containerM">
            <p>Seccion A</p> 
          </div>
        </div>
   </div>
  );
}

export default Perfil;
