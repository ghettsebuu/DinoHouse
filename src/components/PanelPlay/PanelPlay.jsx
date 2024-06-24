// src/components/PanelPlay/PanelPlay.jsx
import React, { useState, useEffect } from 'react';
import SidebarComponent from './Sidebar';
import SceneComponent from './Scene';
import SelectNivel from '../Niveles/SelectNivel';
import './PanelPlay.css';
import ButtonPanel from './ButtonPanel';

const PanelPlay = () => {
    const [studentName, setStudentName] = useState('');
    const [nivelActual, setNivelActual] = useState(1);
    const [mostrarActividad, setMostrarActividad] = useState(false);
    const [mostrarMemoryGame, setMostrarMemoryGame] = useState(false);
    const [mostrarLaboratorio, setMostrarLaboratorio] = useState(false);
    const [mostrarOraciones, setMostrarOraciones] = useState(false);
    const [mostrarCartilla, setMostrarCartilla] = useState(false);
    const [mostrarPalabras, setMostrarPalabras] = useState(false);
    const [mostrarAtrapa, setMostrarAtrapa] = useState(false);
    const [mostrarInferencias, setMostrarInferencias] = useState(false);
    const [mostrarHistorias, setMostrarHistorias] = useState(false);
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
        setMostrarCartilla(false);
        setMostrarPalabras(false);
        setMostrarAtrapa(false);
        setMostrarInferencias(false);
        setMostrarHistorias(false);
    };

    const handleMostrarMemoryGame = () => { 
        setMostrarMemoryGame(true);
        setMostrarActividad(false);
        setMostrarLaboratorio(false);
        setMostrarOraciones(false);
        setMostrarCartilla(false);
        setMostrarPalabras(false);
        setMostrarAtrapa(false);
        setMostrarInferencias(false);
        setMostrarHistorias(false);
    };

    const handleMostrarLaboratorio = () => {
        setMostrarLaboratorio(true);
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
        setMostrarOraciones(false);
        setMostrarCartilla(false);
        setMostrarPalabras(false);
        setMostrarAtrapa(false);
        setMostrarInferencias(false);
        setMostrarHistorias(false);
    };

    const handleMostrarOraciones = () => {
        setMostrarOraciones(true);
        setMostrarLaboratorio(false);
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
        setMostrarCartilla(false);
        setMostrarPalabras(false);
        setMostrarAtrapa(false);
        setMostrarInferencias(false);
        setMostrarHistorias(false);
    };

    const handleMostrarPalabras = () => {
        setMostrarPalabras(true);
        setMostrarOraciones(false);
        setMostrarLaboratorio(false);
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
        setMostrarCartilla(false);
        setMostrarAtrapa(false);
        setMostrarInferencias(false);
        setMostrarHistorias(false);
        
    };

    const handleMostrarAtrapa = () => {
        setMostrarAtrapa(true);
        setMostrarPalabras(false);
        setMostrarOraciones(false);
        setMostrarLaboratorio(false);
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
        setMostrarCartilla(false);
        setMostrarInferencias(false);
        setMostrarHistorias(false);
        
    };

    const handleMostrarInferencias = () => {
        setMostrarInferencias(true);
        setMostrarAtrapa(false);
        setMostrarPalabras(false);
        setMostrarOraciones(false);
        setMostrarLaboratorio(false);
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
        setMostrarCartilla(false);
        setMostrarHistorias(false);
        
    };

    const handleMostrarCartilla = () => {
        setMostrarCartilla(true);
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
        setMostrarLaboratorio(false);
        setMostrarOraciones(false);
        setMostrarPalabras(false);
        setMostrarAtrapa(false);
        setMostrarInferencias(false);
        setMostrarHistorias(false);
    };

    const handleMostrarhistorias = () => {
        setMostrarHistorias(true);
        setMostrarCartilla(false);
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
        setMostrarLaboratorio(false);
        setMostrarOraciones(false);
        setMostrarAtrapa(false);
        setMostrarInferencias(false);
        setMostrarPalabras(false);
       
    };


    const handleVolverALetras = () => {
        setMostrarMemoryGame(false);
        setMostrarActividad(false);
        setMostrarLaboratorio(false);
        setMostrarOraciones(false);
        setMostrarCartilla(false);
        setMostrarPalabras(false);
        setMostrarAtrapa(false);
        setMostrarInferencias(false);
        setMostrarHistorias(false);
    };

    const handleNivelSeleccionado = (nivel) => {
        setNivelActual(nivel);
        setMostrarActividad(false);
        setMostrarMemoryGame(false);
        setMostrarLaboratorio(false);
        setMostrarOraciones(false);
        setMostrarCartilla(false);
        setMostrarPalabras(false);
        setMostrarAtrapa(false);
        setMostrarInferencias(false);
        setMostrarHistorias(false);
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
        setMostrarCartilla(false);
        setMostrarPalabras(false);
        setMostrarAtrapa(false);
        setMostrarInferencias(false);
        setMostrarHistorias(false);
        setMostrarSelectNivel(false);
    };

    return (
        <div className="dashboard">
            <SidebarComponent
                buttonhidden="buttonhidden"
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
                    mostrarCartilla={handleMostrarCartilla}
                    mostrarPalabras={handleMostrarPalabras}
                    mostrarAtrapa={handleMostrarAtrapa}
                    mostrarInferencias={handleMostrarInferencias}
                    mostrarHistorias={handleMostrarhistorias}
                    mostrarActividadState={mostrarActividad}
                    mostrarMemoryGameState={mostrarMemoryGame}
                    mostrarLaboratorioState={mostrarLaboratorio}
                    mostrarOracionesState={mostrarOraciones}
                    mostrarCartillaState={mostrarCartilla}
                    mostrarPalabrasState={mostrarPalabras}
                    mostrarAtrapaState={mostrarAtrapa}
                    mostrarInferenciasState={mostrarInferencias}
                    mostrarHistoriasState={mostrarHistorias}
                    handleVolverALetras={handleVolverALetras}
                />
            )}
              <ButtonPanel
                buttonvisible="buttonvisible"
                onBackButtonClick={handleBackButtonClick}
            />
        </div>
    );
};

export default PanelPlay;
