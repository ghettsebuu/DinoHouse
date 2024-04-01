// Dashboard.js (Componente principal)
import React from 'react';
import SidebarComponent from './Sidebar';
import SceneComponent from './Scene';
import './dashboard.css';

const Dashboard = () => {
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

export default Dashboard;
