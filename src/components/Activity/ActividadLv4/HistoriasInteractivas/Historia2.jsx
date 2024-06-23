// src/components/Activity/ActividadLv4/Historia2.jsx
import React, { useState } from 'react';
import './historias.css';

const Historia2 = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const nextStep = (newStep) => {
    setStep(newStep);
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2>La Amistad de las Estrellas</h2>
            <p>Dina: Miren, una estrella fugaz acaba de caer cerca de nosotros. ¿Qué creen que significa?</p>
            <p>Tito: Tal vez deberíamos seguirla y ver a dónde nos lleva.</p>
            <button onClick={() => nextStep(1)}>Ir hacia la montaña iluminada</button>
            <button onClick={() => nextStep(2)}>Seguir el río que brilla bajo la luz de la luna</button>
          </div>
        );
      case 1:
        return (
          <div>
            <p>Ali: Parece que la estrella cayó cerca de esa montaña iluminada. ¿Vamos?</p>
            <p>Dina: ¡Miren este cristal misterioso! ¿Qué deberíamos hacer con él?</p>
            <button onClick={() => nextStep(3)}>Intentar tocar el cristal</button>
            <button onClick={() => nextStep(4)}>Observar el cristal desde lejos</button>
          </div>
        );
      case 2:
        return (
          <div>
            <p>Rex: El río brilla bajo la luz de la luna. Tal vez podamos encontrar algo especial allí.</p>
            <p>Ali: ¡Qué descubrimiento! Una planta brillante.</p>
            <button onClick={() => onComplete()}>Volver al Menú</button>
          </div>
        );
      case 3:
        return (
          <div>
            <p>Rex: Vamos a tocarlo. ¿Qué podría pasar?</p>
            <p>Tito: ¡El cristal es mágico! ¡Nos concedió un deseo!</p>
            <button onClick={() => onComplete()}>Volver al Menú</button>
          </div>
        );
      case 4:
        return (
          <div>
            <p>Ali: Mejor observemos desde lejos. No sabemos qué poderes tiene este cristal.</p>
            <p>Dina: El cristal emite una energía tan positiva. ¡Qué descubrimiento!</p>
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

export default Historia2;
