import React from 'react';
import Perfil from './Perfil';
import { UserAuth } from '../../Services/AuthContext';

function Sidebar({ onModuleChange }) {
  const {logOut} =UserAuth();
  const handleModuleClick = (module) => {
    onModuleChange(module);
  };

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
    <div className="sidebarM">
      <Perfil />
      <div className='Options'>
        <ul className="moduleList">
          <li className="moduleItem" onClick={() => handleModuleClick('gestion')} >Gestión de Estudiantes</li>
          <li className="moduleItem" onClick={() => handleModuleClick('progreso')}>Progreso de Estudiantes</li>
          <button onClick={cerrarSesion}>Cerrar sesión</button>
        </ul>
      </div>
      
    </div>
  );
}

export default Sidebar;
