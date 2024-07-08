import React from 'react';
/* import './Final.css' */

const FinalScreen = ({ score}) => {
    return (
        <div className="final-screen">
            <h2>¡Felicidades! Has completado la actividad.</h2>
            <p>Puntuación: {score} puntos</p>  {/* Mostrar puntuación */}
           
        </div>
    ); 
};

export default FinalScreen;
