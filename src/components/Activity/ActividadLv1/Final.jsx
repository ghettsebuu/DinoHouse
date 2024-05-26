import React from 'react';

const FinalScreen = ({ onRestart, onGoToHome, onNext }) => {
    return (
        <div className="final-screen">
            <h2>¡Felicidades! Has completado la actividad.</h2>
            <p>¡Buen trabajo!</p>
            <button onClick={onRestart}>Volver a Jugar</button>
            <button onClick={onGoToHome}>Ir a la Pantalla de Inicio</button>
            <button onClick={onNext}>Siguiente</button>
        </div>
    );
}

export default FinalScreen;
