// src/components/Activity/ActividadLv4/Historia2.jsx
import React, { useState } from 'react';
import './historias.css';

const Historia2 = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep(step + 1);
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2>La Amistad de las Estrellas</h2>
            <p>Narrador: Una noche tranquila en el Valle Perdido, nuestros amigos Dino, Tito, Rex y Ali observaban el cielo estrellado.</p>
            <p>-Dina: Miren, una estrella fugaz acaba de caer cerca de nosotros. ¿Qué creen que significa?</p>
            <p>-Tito: Tal vez deberíamos seguirla y ver a dónde nos lleva.</p>
            <img src="/img/Historias/Historia2/estrella_fugaz.png" alt="Estrella fugaz" className="story-image" />
            <button onClick={nextStep} className="next-button">Siguiente</button>
          </div>
        );
      case 1:
        return (
          <div>
            <p>Narrador: El grupo decide seguir la estrella fugaz, y se encuentran con dos caminos.</p>
            <p>-Rex: ¿Cuál camino tomaremos?</p>
            <div className="clickable-image-container">
              <div onClick={() => nextStep(2)} className="clickable-image">
                <img src="/img/Historias/Historia2/montana_iluminada.png" alt="Montaña iluminada" />
                <p>Ir hacia la montaña iluminada</p>
              </div>
              <div onClick={() => nextStep(4)} className="clickable-image">
                <img src="/img/Historias/Historia2/rio_luna.png" alt="Río bajo la luz de la luna" />
                <p>Seguir el río que brilla bajo la luz de la luna</p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <p>Narrador: Deciden dirigirse hacia la montaña iluminada, donde creen que la estrella ha caído.</p>
            <p>-Ali: Parece que la estrella cayó cerca de esa montaña iluminada. ¿Vamos?</p>
            <p>-Dina: ¡Miren este cristal misterioso! ¿Qué deberíamos hacer con él?</p>
            <img src="/img/Historias/Historia2/cristal_misterioso.png" alt="Cristal misterioso" className="story-image" />
            <button onClick={nextStep} className="next-button">Siguiente</button>
          </div>
        );
      case 3:
        return (
          <div>
            <div className="clickable-image-container">
              <div onClick={() => nextStep(5)} className="clickable-image">
                <img src="/img/Historias/Historia2/tocar_cristal.png" alt="Tocar el cristal" />
                <p>Intentar tocar el cristal</p>
              </div>
              <div onClick={() => nextStep(6)} className="clickable-image">
                <img src="/img/Historias/Historia2/observar_cristal.png" alt="Observar el cristal" />
                <p>Observar el cristal desde lejos</p>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <p>Narrador: Deciden seguir el río que brilla bajo la luz de la luna, esperando encontrar algo especial.</p>
            <p>-Rex: El río brilla bajo la luz de la luna. Tal vez podamos encontrar algo especial allí.</p>
            <p>-Ali: ¡Qué descubrimiento! Una planta brillante.</p>
            <img src="/img/Historias/Historia2/planta_brillante.png" alt="Planta brillante" className="story-image" />
            <button onClick={onComplete} className="clickable-image">
              <img src="/img/Historias/Historia2/volver-menu.png" alt="Volver al Menú" />
              <p>Volver al Menú</p>
            </button>
          </div>
        );
      case 5:
        return (
          <div>
            <p>Narrador: Con valentía, deciden tocar el cristal misterioso.</p>
            <p>-Rex: Vamos a tocarlo. ¿Qué podría pasar?</p>
            <p>-Tito: ¡El cristal es mágico! ¡Nos concedió un deseo!</p>
            <img src="/img/Historias/Historia2/cristal_magico.png" alt="Cristal mágico" className="story-image" />
            <button onClick={onComplete} className="clickable-image">
              <img src="/img/Historias/Historia2/volver-menu.png" alt="Volver al Menú" />
              <p>Volver al Menú</p>
            </button>
          </div>
        );
      case 6:
        return (
          <div>
            <p>Narrador: Deciden ser cautelosos y observan el cristal desde lejos.</p>
            <p>-Ali: Mejor observemos desde lejos. No sabemos qué poderes tiene este cristal.</p>
            <p>-Dina: El cristal emite una energía tan positiva. ¡Qué descubrimiento!</p>
            <img src="/img/Historias/Historia2/energia_positiva.png" alt="Energía positiva del cristal" className="story-image" />
            <button onClick={onComplete} className="clickable-image">
              <img src="/img/Historias/Historia2/volver-menu.png" alt="Volver al Menú" />
              <p>Volver al Menú</p>
            </button>
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
