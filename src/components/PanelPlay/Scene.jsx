// SceneComponent.js
import React from 'react';
import './PanelPlay.css';
import Nivel1 from '../Niveles/Nivel1.jsx';
import Nivel2 from '../Niveles/Nivel2.jsx';
import Nivel3 from '../Niveles/Nivel3.jsx';
import Nivel4 from '../Niveles/Nivel4.jsx';
import ActividadLv1 from '../Activity/ActividadLv1/ActividadLv1.jsx';


const SceneComponent = () => {
  return (
    <div className="scene">
       {/* <Nivel1 />  */}
       {/*  <Nivel2 />   */} 
       {/* <Nivel3 />   */}
       {/* <Nivel4 />  */}  
      
            <ActividadLv1 />
    </div>
  );
};

export default SceneComponent;
