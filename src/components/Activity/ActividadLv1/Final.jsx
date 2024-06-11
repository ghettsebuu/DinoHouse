import React from 'react';

const FinalScreen = ({ onRestart, onGoToHome, onNext }) => {
    return (
        <div className="final-screen">
            <h2>¡Felicidades! Has completado la actividad.</h2>
            <p>¡Buen trabajo!</p>
            <button onClick={onRestart}>
                <i class="fa-solid fa-arrow-rotate-left"></i>
            </button>
            <button onClick={onGoToHome}>
                <i class="fa-regular fa-square"></i>
            </button>
            <button onClick={onNext}>
                <i class="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    );
}

export default FinalScreen;
