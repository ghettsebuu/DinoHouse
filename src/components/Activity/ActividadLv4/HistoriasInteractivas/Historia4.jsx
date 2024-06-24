// src/components/Activity/ActividadLv4/Historia4.jsx
import React, { useState } from 'react';
import './historias.css';

const Historia4 = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const nextStep = (newStep) => {
    setStep(newStep);
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2>El Misterio del Volcán Dormido</h2>
            <p>Ali: Este volcán parece haber estado inactivo durante mucho tiempo. ¿Qué creen que encontraremos dentro?</p>
            <button onClick={() => nextStep(1)}>Investigar las cuevas oscuras en la base</button>
            <button onClick={() => nextStep(2)}>Subir por el sendero que serpentea hacia la cima</button>
          </div>
        );
      case 1:
        return (
          <div>
            <p>Tito: Las cuevas siempre ocultan secretos. Vamos a ver qué encontramos.</p>
            <p>Ali: ¡Miren estos cristales brillantes! Parecen tener mucha energía.</p>
            <button onClick={() => nextStep(3)}>Intentar llevarse un cristal</button>
            <button onClick={() => nextStep(4)}>Dejar los cristales donde están y continuar</button>
          </div>
        );
      case 2:
        return (
          <div>
            <p>Rex: Subamos hacia la cima. La vista desde allí debe ser impresionante.</p>
            <p>Ali: Desde la cima, la vista panorámica es impresionante. ¡Qué aventura tan increíble!</p>
            <button onClick={() => onComplete()}>Volver al Menú</button>
          </div>
        );
      case 3:
        return (
          <div>
            <p>Dina: Quizás podamos usar estos cristales para algo bueno. Vamos a llevarnos uno.</p>
            <p>Tito: ¡Este cristal emite una energía curativa! Qué descubrimiento tan asombroso.</p>
            <button onClick={() => onComplete()}>Volver al Menú</button>
          </div>
        );
      case 4:
        return (
          <div>
            <p>Rex: Mejor dejemos los cristales donde están y sigamos explorando.</p>
            <p>Ali: Desde la cima, la vista panorámica es impresionante. ¡Qué aventura tan increíble!</p>
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

export default Historia4;
