import React from 'react';

const FinalScreen = ({ onRestart, onGoToHome }) => {
    return (
        <div className="final-screen">
            <h2>¡Felicidades! Has completado la actividad.</h2>
            <p>¡Buen trabajo!</p>
            <button onClick={onRestart}>Volver a Jugar</button>
            <button onClick={onGoToHome}>Ir a la Pantalla de Inicio</button>
        </div>
    );
}

export default FinalScreen;
