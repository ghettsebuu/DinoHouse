// src/components/ProgressBar/ProgressBar.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../Firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './ProgressBar.css';
import LoadingScreen from '../LoadingScreen/LoadingScreen'; // Importa el componente de pantalla de carga
/* import Insignia from './insignia'; */

const ProgressBar = ({ codigoAcceso, level, onLevelUp }) => {
  const [puntos, setPuntos] = useState(0);
  const [loading, setLoading] = useState(true); // Estado para controlar la carga

  const handleClick = () => {
    const audio = new Audio('/AudiosInstrucciones/progreso.mp3');
    audio.play();
  };

  useEffect(() => {
    const obtenerPuntuacion = async () => {
      try {
        const docRef = doc(db, 'Puntuacion', codigoAcceso);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const puntuacionData = docSnap.data();
          const puntosNivel = puntuacionData[`Level${level}`] || 0;
          setPuntos(puntosNivel);

          // Verificar si se alcanzan los 1000 puntos y avanzar al siguiente nivel
          if (puntosNivel >= 1000 && level < 4) {
            if (typeof onLevelUp === 'function') {
              onLevelUp(level + 1);
            } else {
              console.warn('onLevelUp no es una función');
            }
          }
        } else {
          console.log('No se encontró el documento');
        }
      } catch (error) {
        console.error('Error al obtener la puntuación:', error);
      } finally {
        setLoading(false); // Una vez que se completa la carga, cambia el estado de loading
      }
    };

    obtenerPuntuacion();
  }, [codigoAcceso, level, onLevelUp]);

  const progreso = Math.min((puntos / 1000) * 100, 100);
  const nivelClass = `progressN-level${level}`;

  if (loading) {
    return <LoadingScreen />; // Muestra la pantalla de carga mientras se carga la información
  }

  return (
    <div className="progress-bar-container">
      <div className="progress-barN" onClick={handleClick}>
        <div className={`progressN ${nivelClass}`} style={{ width: `${progreso}%` }}>
          <span>{puntos} / 1000</span>
        </div>
      </div>
     {/*  <Insignia level={level} puntos={puntos} /> */}
    </div>
  );
};

export default ProgressBar;
