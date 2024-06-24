// src/components/Activity/ActividadLv4/Historia1.jsx
import React, { useState } from 'react';
import './historias.css';

const Historia1 = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  const nextStep = (newStep) => {
    setStep(newStep);
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2>El Misterio del Valle Perdido</h2>
            <p>En el Valle Perdido, los dinosaurios Rex, Ali, Dina y Tito descubren un misterio que debe ser resuelto.</p>
            <p>-Rex: ¡Miren esto, amigos! Un sendero se bifurca frente a nosotros. ¿Qué deberíamos hacer?</p>
            <p>-Ali: ¿Por dónde creen que deberíamos ir?</p>
            <p>-Dina: ¡Yo creo que el camino ancho parece más seguro!</p>
            <p>-Tito: Pero el camino estrecho podría llevar a algo más emocionante.</p>
            <button onClick={() => nextStep(1)}>Tomar el camino estrecho y rocoso</button>
            <button onClick={() => nextStep(2)}>Seguir el camino ancho y cubierto de flores</button>
          </div>
        );
      case 1:
        return (
          <div>
            <p>-Rex: Vamos por el camino estrecho. ¡Quién sabe qué aventuras nos esperan!</p>
            <p>-Rex: ¡Oh! Una cueva oscura. ¿Deberíamos entrar?</p>
            <p>-Tito: ¡Claro! Vamos a explorar.</p>
            <p>-Ali: Optemos por el camino ancho. Parece más acogedor y lleno de vida.</p>
            <button onClick={() => nextStep(3)}>Explorar más adentro</button>
            <button onClick={() => nextStep(4)}>Volver afuera y buscar otra ruta</button>
          </div>
        );
      case 2:
        return (
          <div>
            <p>-Ali: ¡Qué maravilla! Una cascada brillante. Esto es increíble.</p>
            <button onClick={() => onComplete()}>Volver al Menú</button>
          </div>
        );
      case 3:
        return (
          <div>
            <p>Dina: ¿Vamos más adentro? Podríamos encontrar algo valioso.</p>
            <p>Rex: ¡Miren este tesoro antiguo! ¡Qué hallazgo!</p>
            <button onClick={() => onComplete()}>Volver al Menú</button>
          </div>
        );
      case 4:
        return (
          <div>
            <p>Ali: Mejor volvamos afuera y busquemos otra ruta. Esta cueva da un poco de miedo.</p>
            <p>Tito: ¡Encontramos una salida secreta! ¡Qué ingenioso!</p>
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

export default Historia1;
