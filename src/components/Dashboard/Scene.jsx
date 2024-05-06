// SceneComponent.js
import React from 'react';
import './dashboard.css';
import Nivel1 from '../Niveles/Nivel1.jsx';
import Nivel2 from '../Niveles/Nivel2.jsx';
import Nivel3 from '../Niveles/Nivel3.jsx';
import Nivel4 from '../Niveles/Nivel4.jsx';

const SceneComponent = () => {
  return (
    <div className="scene">
       <Nivel1 /> 
      {/*  <Nivel2 />   */} 
       {/* <Nivel3 />   */}
       {/* <Nivel4 /> */}   
    </div>
  );
};

export default SceneComponent;