// Dashboard.js (Componente principal)
import React from 'react';
import SidebarComponent from './Sidebar';
import SceneComponent from './Scene';
import './PanelPlay.css';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const PanelPlay = () => {
  return (
    <div className="dashboard">
      <SidebarComponent 
        avatar="url_del_avatar" 
        username="Getsemani" 
        level={1} 
      />
      
      <SceneComponent />
     
    </div>
  );
};

export default PanelPlay;
