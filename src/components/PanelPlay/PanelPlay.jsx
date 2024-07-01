// src/components/PanelPlay/PanelPlay.jsx
import React, { useState, useEffect } from 'react';
import SidebarComponent from './Sidebar';
import SceneComponent from './Scene';
import SelectNivel from '../Niveles/SelectNivel';
import { db } from '../../Firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './PanelPlay.css';
import ButtonPanel from './ButtonPanel';

const PanelPlay = () => {
  const [studentName, setStudentName] = useState('');
  const [nivelActual, setNivelActual] = useState(1);
  const [actividadMostrada, setActividadMostrada] = useState('');
  const [accesoNiveles, setAccesoNiveles] = useState([1]);
  const [codigoAcceso, setCodigoAcceso] = useState(null);

  useEffect(() => {
    const name = localStorage.getItem('studentName');
    const codigo = localStorage.getItem('codigoAcceso');
    console.log('useEffect - studentName:', name);
    console.log('useEffect - codigoAcceso:', codigo);

    if (name) {
      setStudentName(name);
    }

    if (codigo) {
      setCodigoAcceso(codigo);
    }
  }, []);

  useEffect(() => {
    if (codigoAcceso) {
      obtenerPuntuacion(codigoAcceso);
    }
  }, [codigoAcceso]);

  const obtenerPuntuacion = async (codigoAcceso) => {
    console.log('obtenerPuntuacion - codigoAcceso:', codigoAcceso);
    try {
      const docRef = doc(db, 'Puntuacion', codigoAcceso);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const puntuacionData = docSnap.data();
        console.log('Puntuación obtenida:', puntuacionData);

        let nivelesAcceso = [1];
        let nuevoNivelActual = 1;
        if (puntuacionData.Level1 >= 1000) {
          nivelesAcceso.push(2);
          nuevoNivelActual = 2;
        }
        if (puntuacionData.Level2 >= 1000) {
          nivelesAcceso.push(3);
          nuevoNivelActual = 3;
        }
        if (puntuacionData.Level3 >= 1000) {
          nivelesAcceso.push(4);
          nuevoNivelActual = 4;
        }
        console.log('Niveles con acceso:', nivelesAcceso);
        setAccesoNiveles(nivelesAcceso);
        setNivelActual(nuevoNivelActual);
      } else {
        console.log('No se encontraron datos de puntuación para este código de acceso');
      }
    } catch (error) {
      console.error("Error al obtener la puntuación:", error);
    }
  };

  const handleMostrar = (actividad) => {
    setActividadMostrada(actividad);
  };

  const handleNivelSeleccionado = (nivel) => {
    if (accesoNiveles.includes(nivel)) {
      setNivelActual(nivel);
      setActividadMostrada('');
    } else {
      alert(`No tienes acceso al nivel ${nivel}`);
    }
  };

  const handleVolverALetras = () => {
    setActividadMostrada('');
  };

  const handleLevelUp = (nuevoNivel) => {
    if (nuevoNivel <= 4) {
      setNivelActual(nuevoNivel);
    }
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
          codigoAcceso={codigoAcceso}
          onLevelUp={handleLevelUp} // Pasar handleLevelUp a SceneComponent
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
