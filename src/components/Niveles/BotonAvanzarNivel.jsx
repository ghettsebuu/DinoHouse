// src/components/BotonAvanzarNivel/BotonAvanzarNivel.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../Firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import './BotonAvanzarNivel.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const BotonAvanzarNivel = ({ codigoAcceso, level, onLevelUp }) => {
  const [puntos, setPuntos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [puedeAvanzar, setPuedeAvanzar] = useState(false);

  useEffect(() => {
    const obtenerPuntuacion = async () => {
      try {
        const docRef = doc(db, 'Puntuacion', codigoAcceso);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const puntuacionData = docSnap.data();
          const puntosNivel = puntuacionData[`Level${level}`] || 0;
          setPuntos(puntosNivel);
          if (puntosNivel >= 1000) {
            setPuedeAvanzar(true);
          }
        } else {
          console.log('No se encontró el documento');
        }
      } catch (error) {
        console.error('Error al obtener la puntuación:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerPuntuacion();
  }, [codigoAcceso, level]);

  const handleAvanzarNivel = () => {
    if (puedeAvanzar && typeof onLevelUp === 'function') {
      onLevelUp(level + 1);
    }
  };

  return (
    <button 
      className={`boton-avanzar-nivel ${puedeAvanzar ? 'activo' : 'inactivo'}`} 
      onClick={handleAvanzarNivel}
      disabled={!puedeAvanzar}
    >
     {loading ? 'Cargando...' : (
        <>
           <FontAwesomeIcon icon={faArrowRight} />
           
        </>
      )}
    </button>
  );
};

export default BotonAvanzarNivel;
