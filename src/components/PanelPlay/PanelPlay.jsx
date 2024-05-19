import React, { useState, useEffect } from 'react';
import SidebarComponent from './Sidebar';
import SceneComponent from './Scene';
import './PanelPlay.css';

const PanelPlay = () => {
    const [studentName, setStudentName] = useState('');

    useEffect(() => {
        // Obtén el nombre del estudiante desde localStorage
        const name = localStorage.getItem('studentName');
        if (name) {
            setStudentName(name);
        }
    }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez al montar el componente

    return (
        <div className="dashboard">
            <SidebarComponent 
                avatar="url_del_avatar" 
                Nombre={studentName} 
                level={1} 
            />
            <SceneComponent />
        </div>
    );
};

export default PanelPlay;
