// PanelMaestro (Componente principal)
import React, { useEffect } from 'react';
import { UserAuth } from '../../Services/AuthContext';

const PanelM = () => {
  const {user,logOut} =UserAuth();
  const cerrarSesion= async ()=>{
    try {
        await logOut();
    } catch (error) {
        console.log(error)
    }
  }
 /*  useEffect(()=>{

  }) */
  return (
    <div className="PanelM">
       <h1>Bienvenido {user.displayName} </h1>
       <button onClick={cerrarSesion}>Cerrar sesión</button>
    </div>
  );
};

export default PanelM;
