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
    const [actividadMostrada, setActividadMostrada] = useState('');

    useEffect(() => {
        const name = localStorage.getItem('studentName');
        if (name) {
            setStudentName(name);
        }
    }, []);

    const handleMostrar = (actividad) => {
        setActividadMostrada(actividad);
    };

    const handleNivelSeleccionado = (nivel) => {
        setNivelActual(nivel);
        setActividadMostrada('');
    };

    const handleVolverALetras = () => {
        setActividadMostrada('');
    };

    return (
        <div className="dashboard">
            <SidebarComponent
                buttonhidden="buttonhidden"
                avatar="url_del_avatar"
                Nombre={studentName}
                level={nivelActual}
                mostrarSelectNivel={() => handleMostrar('selectNivel')}
                onBackButtonClick={handleVolverALetras}
            />
            {actividadMostrada === 'selectNivel' ? (
                <SelectNivel seleccionarNivel={handleNivelSeleccionado} />
            ) : (
                <SceneComponent
                    nivelActual={nivelActual}
                    mostrarActividad={() => handleMostrar('actividad')}
                    mostrarMemoryGame={() => handleMostrar('memoryGame')}
                    mostrarLaboratorio={() => handleMostrar('laboratorio')}
                    mostrarOraciones={() => handleMostrar('oraciones')}
                    mostrarCartilla={() => handleMostrar('cartilla')}
                    mostrarPalabras={() => handleMostrar('palabras')}
                    mostrarAtrapa={() => handleMostrar('atrapa')}
                    mostrarInferencias={() => handleMostrar('inferencias')}
                    mostrarHistorias={() => handleMostrar('historias')}
                    actividadMostrada={actividadMostrada}
                    handleVolverALetras={handleVolverALetras}
                />
            )}
            <ButtonPanel
                buttonvisible="buttonvisible"
                onBackButtonClick={handleVolverALetras}
            />
        </div>
    );
};

export default PanelPlay;