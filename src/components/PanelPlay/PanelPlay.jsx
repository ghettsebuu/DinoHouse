// src/components/PanelPlay/PanelPlay.jsx
import React, { useState, useEffect } from 'react';
import SidebarComponent from './Sidebar';
import SceneComponent from './Scene';
import SelectNivel from '../Niveles/SelectNivel';
import './PanelPlay.css';

const PanelPlay = () => {
    const [studentName, setStudentName] = useState('');
    const [nivelActual, setNivelActual] = useState(1);
    const [mostrarActividad, setMostrarActividad] = useState(false);
    const [mostrarMemoryGame, setMostrarMemoryGame] = useState(false);
    const [mostrarLaboratorio, setMostrarLaboratorio] = useState(false);
    const [mostrarSelectNivel, setMostrarSelectNivel] = useState(false);

    useEffect(() => {
        // Obtén el nombre del estudiante desde localStorage
        const name = localStorage.getItem('studentName');
        if (name) {
            setStudentName(name);
        }
    }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez al montar el componente

    const handleMostrarActividad = () => {
        setMostrarActividad(true);
        setMostrarMemoryGame(false);
        setMostrarLaboratorio(false);
    };

    const handleMostrarMemoryGame = () => {
        setMostrarMemoryGame(true);
        setMostrarActividad(false);
        setMostrarLaboratorio(false);
    };

    const handleMostrarLaboratorio = () => {
        setMostrarLaboratorio(true);
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
    };

    const handleVolverALetras = () => {
        setMostrarMemoryGame(false);
        setMostrarActividad(false);
        setMostrarLaboratorio(false);
    };

    const handleNivelSeleccionado = (nivel) => {
        setNivelActual(nivel);
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
        setMostrarLaboratorio(false);
        setMostrarSelectNivel(false);
    };

    const handleMostrarSelectNivel = () => {
        setMostrarSelectNivel(true);
    };

    const handleBackButtonClick = () => {
        // Volver al panel principal
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
        setMostrarLaboratorio(false);
        setMostrarSelectNivel(false);
    };

    return (
        <div className="dashboard">
            <SidebarComponent 
                avatar="url_del_avatar" 
                Nombre={studentName} 
                level={nivelActual} 
                mostrarSelectNivel={handleMostrarSelectNivel}
                onBackButtonClick={handleBackButtonClick} // Pasar la función al Sidebar
            />
            {mostrarSelectNivel ? (
                <SelectNivel seleccionarNivel={handleNivelSeleccionado} />
            ) : (
                <SceneComponent 
                    nivelActual={nivelActual} 
                    mostrarActividad={handleMostrarActividad} 
                    mostrarMemoryGame={handleMostrarMemoryGame} 
                    mostrarLaboratorio={handleMostrarLaboratorio}
                    mostrarActividadState={mostrarActividad}
                    mostrarMemoryGameState={mostrarMemoryGame}
                    mostrarLaboratorioState={mostrarLaboratorio}
                    handleVolverALetras={handleVolverALetras}
                />
            )}
        </div>
    );
};

export default PanelPlay;
