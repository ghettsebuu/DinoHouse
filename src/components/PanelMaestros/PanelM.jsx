// PanelMaestro (Componente principal)
import React, { useState} from 'react';

import Sidebar from './Sidebar';
import GestionEstudiantes from './GestionEstudiantes';
import ProgresoEstudiantes from './ProgresoEstudiantes';
import './PanelM.css';

const PanelM = () => {
  
  const [selectedModule, setSelectedModule] = useState('gestion');

 

  const handleModuleChange = (module) => {
    setSelectedModule(module);
  };

  return (
    
    <div className="panelM">
      <Sidebar onModuleChange={handleModuleChange} />
      
      
      <div className="mainContent">
        {selectedModule === 'gestion' && <GestionEstudiantes />}
        {selectedModule === 'progreso' && <ProgresoEstudiantes />}
      </div>
    </div>
    
  );
};

export default PanelM;



 


