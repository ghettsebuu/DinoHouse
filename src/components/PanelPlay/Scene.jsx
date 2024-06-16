// src/components/PanelPlay/SceneComponent.jsx
import React from 'react';
import './PanelPlay.css';
import Nivel1 from '../Niveles/Nivel1.jsx';
import Nivel2 from '../Niveles/Nivel2.jsx';
import Nivel3 from '../Niveles/Nivel3.jsx';
import Nivel4 from '../Niveles/Nivel4.jsx';
import ActividadLv1 from '../Activity/ActividadLv1/ActividadLv1.jsx';
import ActividadLv2 from '../Activity/ActividadLv2/ActividadLv2.jsx';
import ActividadLv3 from '../Activity/ActividadLv3/ActividadLv3.jsx';
import ActividadLv4 from '../Activity/ActividadLv4/ActividadLv4.jsx';
import MemoryGameLv1 from '../Activity/ActividadLv1/MemoryGame.jsx';
import MemoryGameLv2 from '../Activity/ActividadLv2/MemoryGame.jsx';
import MemoryGameLv3 from '../Activity/ActividadLv3/MemoryGame.jsx';
import MemoryGameLv4 from '../Activity/ActividadLv4/MemoryGame.jsx';
import LaboratorioSilabas from '../Activity/ActividadLv2/Laboratorio/LaboratorioSilabas.jsx';
import Oraciones from '../Activity/ActividadLv3/Oraciones.jsx';
import Palabras from '../Activity/ActividadLv2/Palabras.jsx';
import Cartilla from '../Activity/ActividadLv1/Cartilla.jsx';
import HistoriasInteractivas from '../Activity/ActividadLv4/HistoriasInteractivas.jsx';

const SceneComponent = ({
  nivelActual,
  mostrarActividad,
  mostrarMemoryGame,
  mostrarLaboratorio,
  mostrarOraciones,
  mostrarCartilla,
  mostrarPalabras,
  mostrarHistorias,

  mostrarActividadState,
  mostrarMemoryGameState,
  mostrarLaboratorioState,
  mostrarOracionesState,
  mostrarCartillaState,
  mostrarPalabrasState,
  mostrarHistoriasState,
  handleVolverALetras

}) => {
  let NivelComponent;
  let ActividadComponent;
  let MemoryGameComponent;

  switch (nivelActual) {
    case 1:
      NivelComponent = Nivel1;
      ActividadComponent = ActividadLv1;
      MemoryGameComponent = MemoryGameLv1;
      break;
    case 2:
      NivelComponent = Nivel2;
      ActividadComponent = ActividadLv2;
      MemoryGameComponent = MemoryGameLv2;
      break;
    case 3:
      NivelComponent = Nivel3;
      ActividadComponent = ActividadLv3;
      MemoryGameComponent = MemoryGameLv3;
      break;
    case 4:
      NivelComponent = Nivel4;
      ActividadComponent = ActividadLv4;
      MemoryGameComponent = MemoryGameLv4;
      break;
    default:
      NivelComponent = Nivel1;
      ActividadComponent = ActividadLv1;
      MemoryGameComponent = MemoryGameLv1;
      break;
  }

  return ( 
    <div className="scene">
      {!mostrarActividadState && !mostrarMemoryGameState && !mostrarLaboratorioState && !mostrarOracionesState && !mostrarCartillaState && !mostrarPalabrasState && !mostrarHistoriasState ?(
        <NivelComponent mostrarActividad={mostrarActividad} mostrarMemoryGame={mostrarMemoryGame} mostrarLaboratorio={mostrarLaboratorio} mostrarOraciones={mostrarOraciones} 
        mostrarCartilla={mostrarCartilla} mostrarPalabras={mostrarPalabras} mostrarHistorias={mostrarHistorias}/>
      ) : mostrarActividadState ? (
        <ActividadComponent mostrarActividad={mostrarActividad} />
      ) : mostrarMemoryGameState ? (
        <MemoryGameComponent onNext={handleVolverALetras} />
      ) : mostrarLaboratorioState ? (
        <LaboratorioSilabas /> 
      ) : mostrarOracionesState ? (
        <Oraciones mostrarOraciones={mostrarOraciones} />
      ) : mostrarPalabrasState ? (
        <Palabras mostrarPalabras={mostrarPalabras} />
      ) : mostrarHistoriasState ? (
        <HistoriasInteractivas mostrarHistorias={mostrarHistorias} />
      ) : mostrarCartillaState ? (
        <Cartilla onBack={handleVolverALetras} />
      ) : null}

    </div>
  );
};


export default SceneComponent;
