// Sidebar.js
import React from 'react';
import Perfil from './Perfil';
import { UserAuth } from '../../Services/AuthContext';
import './SidebarM.css';

function Sidebar({ onModuleChange, visible }) {
  const { logOut } = UserAuth();

  const handleModuleClick = (module) => {
    onModuleChange(module);
  };

  const cerrarSesion = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`sidebarM ${visible ? 'visible' : 'hidden'}`}>
      <Perfil />
      <div className="Options">
        <ul className="moduleList">
          <li className="moduleItem" onClick={() => handleModuleClick('gestion')}>Gestión de Estudiantes</li>
          <li className="moduleItem" onClick={() => handleModuleClick('progreso')}>Progreso de Estudiantes</li>
        </ul>
        <button className="buttonCerrarSesion" onClick={cerrarSesion}>Cerrar sesión</button>
      </div>
    </div>
  );
}

export default Sidebar;
