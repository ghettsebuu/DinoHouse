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
    const [mostrarOraciones, setMostrarOraciones] = useState(false);
    const [mostrarSelectNivel, setMostrarSelectNivel] = useState(false);

    useEffect(() => {
        const name = localStorage.getItem('studentName');
        if (name) {
            setStudentName(name);
        }
    }, []);

    const handleMostrarActividad = () => {
        setMostrarActividad(true);
        setMostrarMemoryGame(false);
        setMostrarLaboratorio(false);
        setMostrarOraciones(false);
    };

    const handleMostrarMemoryGame = () => {
        setMostrarMemoryGame(true);
        setMostrarActividad(false);
        setMostrarLaboratorio(false);
        setMostrarOraciones(false);
    };

    const handleMostrarLaboratorio = () => {
        setMostrarLaboratorio(true);
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
        setMostrarOraciones(false);
    };

    const handleMostrarOraciones = () => {
        setMostrarOraciones(true);
        setMostrarLaboratorio(false);
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
    };

    const handleVolverALetras = () => {
        setMostrarMemoryGame(false);
        setMostrarActividad(false);
        setMostrarLaboratorio(false);
        setMostrarOraciones(false);
    };

    const handleNivelSeleccionado = (nivel) => {
        setNivelActual(nivel);
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
        setMostrarLaboratorio(false);
        setMostrarOraciones(false);
        setMostrarSelectNivel(false);
    };

    const handleMostrarSelectNivel = () => {
        setMostrarSelectNivel(true);
    };

    const handleBackButtonClick = () => {
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
        setMostrarLaboratorio(false);
        setMostrarOraciones(false);
        setMostrarSelectNivel(false);
    };

    return (
        <div className="dashboard">
            <SidebarComponent
                avatar="url_del_avatar"
                Nombre={studentName}
                level={nivelActual}
                mostrarSelectNivel={handleMostrarSelectNivel}
                onBackButtonClick={handleBackButtonClick}
            />
            {mostrarSelectNivel ? (
                <SelectNivel seleccionarNivel={handleNivelSeleccionado} />
            ) : (
                <SceneComponent
                    nivelActual={nivelActual}
                    mostrarActividad={handleMostrarActividad}
                    mostrarMemoryGame={handleMostrarMemoryGame}
                    mostrarLaboratorio={handleMostrarLaboratorio}
                    mostrarOraciones={handleMostrarOraciones}
                    mostrarActividadState={mostrarActividad}
                    mostrarMemoryGameState={mostrarMemoryGame}
                    mostrarLaboratorioState={mostrarLaboratorio}
                    mostrarOracionesState={mostrarOraciones}
                    handleVolverALetras={handleVolverALetras}
                />
            )}
        </div>
    );
};

export default PanelPlay;
