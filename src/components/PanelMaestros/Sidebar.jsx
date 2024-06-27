// Sidebar.js
import React from 'react';
import Perfil from './Perfil';
import { useAuth } from '../../Services/AuthContext';
import { useNavigate } from 'react-router-dom';
import './SidebarM.css';

function Sidebar({ onModuleChange, visible }) {
  const { logOut } = useAuth();
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

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
        <button onClick={goToHome} className="buttonCerrarSesion">Inicio</button>
        <button className="buttonCerrarSesion" onClick={cerrarSesion}>Cerrar sesión</button>
      </div>
    </div>
  );
}

export default Sidebar;
