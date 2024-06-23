// src/components/Activity/ActividadLv4/Historia3.jsx
import React, { useState } from 'react';
import './historias.css';

const Historia3 = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const nextStep = (newStep) => {
    setStep(newStep);
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2>La Prueba de Coraje en el Bosque Encantado</h2>
            <p>Tito: Este bosque parece lleno de misterios. ¿Están listos para explorar?</p>
            <button onClick={() => nextStep(1)}>Seguir el camino de las luces parpadeantes</button>
            <button onClick={() => nextStep(2)}>Tomar el camino cubierto de niebla espesa</button>
            <button onClick={() => nextStep(3)}>Subir por el sendero empinado de rocas</button>
          </div>
        );
      case 1:
        return (
          <div>
            <p>Rex: Las luces parpadeantes nos llaman. ¿Deberíamos seguir ese camino?</p>
            <p>Rex: ¡Miren, un unicornio místico! ¡Qué sorpresa!</p>
            <button onClick={() => onComplete()}>Volver al Menú</button>
          </div>
        );
      case 2:
        return (
          <div>
            <p>Dina: La niebla espesa nos da un poco de miedo, pero vamos a investigar.</p>
            <p>Dina: ¡Un dragón dormido! ¿Qué hacemos ahora?</p>
            <button onClick={() => nextStep(4)}>Despertar al dragón</button>
            <button onClick={() => nextStep(5)}>Dejar al dragón tranquilo y continuar</button>
          </div>
        );
      case 3:
        return (
          <div>
            <p>Ali: Creo que subir por el sendero empinado de rocas nos llevará a una vista increíble.</p>
            <p>Ali: ¡Miren, un nido de aves exóticas! ¡Qué maravilla!</p>
            <button onClick={() => onComplete()}>Volver al Menú</button>
          </div>
        );
      case 4:
        return (
          <div>
            <p>Tito: Creo que podemos despertarlo de manera amigable. Quizás sea amistoso.</p>
            <p>Ali: ¡El dragón es amigable! Nos ayudó a encontrar un tesoro escondido.</p>
            <button onClick={() => onComplete()}>Volver al Menú</button>
          </div>
        );
      case 5:
        return (
          <div>
            <p>Rex: Mejor dejemos al dragón tranquilo y sigamos nuestro camino.</p>
            <p>Dina: Encontramos una ruta segura hacia el final del bosque. ¡Qué aventura!</p>
            <button onClick={() => onComplete()}>Volver al Menú</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="historia">
      {renderContent()}
    </div>
  );
};

export default Historia3;
