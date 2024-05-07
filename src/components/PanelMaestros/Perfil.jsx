import React from 'react';
import { UserAuth } from '../../Services/AuthContext';


function Perfil() {
  const {user} =UserAuth();
 

  return (
   <div className='avatar-card'>
        <img src="" alt="Avatar" className="avatar" />
        <div className="user-info">
          <div className="username-container">
            <p>{user.displayName}</p>
          </div>
          <div className="level-container">
            <p>Seccion A</p> 
          </div>
        </div>
   </div>
  );
}

export default Perfil;
