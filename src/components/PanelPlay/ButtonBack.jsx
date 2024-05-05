// BackButtonComponent.js
import React from 'react';
import './PanelPlay.css';
import { UserAuth } from '../../Services/AuthContext';

const BackButtonComponent = () => {
  const {user,logOut} =UserAuth();
  const cerrarSesion= async ()=>{
    try {
        await logOut();
    } catch (error) {
        console.log(error)
    }
  }
  return (
    
    <button onClick={cerrarSesion} className="back-button button">
      <i class="fa-solid fa-right-from-bracket"></i>
    </button>
  );
};

export default BackButtonComponent;
