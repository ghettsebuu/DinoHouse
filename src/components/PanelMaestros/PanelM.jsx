// PanelM.js (Componente principal)
import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import GestionEstudiantes from './Gestion/GestionEstudiantes';
import ProgresoEstudiantes from './ProgresoEstudiantes';
import './PanelM.css';
import { FaBars } from 'react-icons/fa';

const PanelM = () => {
  const [selectedModule, setSelectedModule] = useState('gestion');
  const [sidebarVisible, setSidebarVisible] = useState(window.innerWidth > 768);
  const [students, setStudents] = useState([]); // Asume que tienes una manera de obtener estos datos


  const handleModuleChange = (module) => { 
    setSelectedModule(module);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setSidebarVisible(true);
      } else {
        setSidebarVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initialize the state based on the current window size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="panelM">
      <div className="menuIcon" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <Sidebar onModuleChange={handleModuleChange} visible={sidebarVisible} />
      <div className={`mainContent ${!sidebarVisible ? 'shifted' : ''}`}>
        {selectedModule === 'gestion' && <GestionEstudiantes />}
        {selectedModule === 'progreso' && <ProgresoEstudiantes students={students} />}
      </div>
    </div>
  );
};

export default PanelM;




