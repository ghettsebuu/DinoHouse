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
          <div className='his'>
            <h2>El Misterio del Valle Perdido</h2>
            <p>En el Valle Perdido, los dinosaurios Rex, Ali, Dina y Tito descubren un misterio que debe ser resuelto.</p>
            <img src="/img/Historias/Historia1/dinoamigos.png" alt="Valle Perdido" className="story-image"/>
            <img src="/img/Historias/Historia1/valle.png" alt="Valle Perdido" className="story-image"/>
            <button className="buttonH" onClick={() => nextStep(1)}>Siguiente</button>
          </div>
        );
      case 1:
        return (
          <div className='his'>
            <p>Narrador: Un día soleado en el Valle Perdido, los cuatro amigos se encontraron con un sendero que se bifurcaba.</p>
            <p>-Rex: ¡Miren esto, amigos! Un sendero con dos caminos. ¿Qué deberíamos hacer?</p>
            <p>-Ali: ¿Por dónde creen que deberíamos ir?</p>
            <p>-Dina: ¡Yo creo que el camino ancho parece más seguro!</p>
            <p>-Tito: Pero el camino estrecho podría llevar a algo más emocionante.</p>
           {/*  <img src="/img/Historias/Historia1/sendero.png" alt="Sendero bifurcado" className="story-image"/> */}
            <div className="clickable-image-container">
              <div onClick={() => nextStep(2)} className="clickable-image">
                <img src="/img/Historias/Historia1/estrecho-rocoso.png" alt="Camino estrecho y rocoso" />
                <p>Tomar el camino estrecho y rocoso</p>
              </div>
              <div onClick={() => nextStep(3)} className="clickable-image">
                <img src="/img/Historias/Historia1/ancho-flores.png" alt="Camino ancho y cubierto de flores" />
                <p>Seguir el camino ancho y cubierto de flores</p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className='his'>
            <p>-Rex: Vamos por el camino estrecho. ¡Quién sabe qué aventuras nos esperan!</p>
            <img src="/img/Historias/Historia1/rex.png" alt="Camino estrecho" className="story-image"/>
            <img src="/img/Historias/Historia1/estrecho-rocoso.png" alt="Camino estrecho" className="story-image"/>
            <button className="buttonH" onClick={() => nextStep(4)}>Siguiente</button>
          </div>
        );
      case 3:
        return (
          <div className='his'>
            <p>-Ali: Optemos por el camino ancho. Parece más acogedor y lleno de vida.</p>
            <img src="/img/Historias/Historia1/ali.png" alt="Camino ancho" className="story-image"/>
            <img src="/img/Historias/Historia1/ancho-flores.png" alt="Camino ancho" className="story-image"/>
            <button className="buttonH" onClick={() => nextStep(5)}>Siguiente</button>
          </div>
        );
      case 4:
        return (
          <div className='his'>
            <p>-Rex: ¡Oh! Una cueva oscura. ¿Deberíamos entrar?</p>
            <p>-Tito: ¡Claro! Vamos a explorar.</p>
            <p>-Ali: Mejor volvamos afuera y busquemos otra ruta. Esta cueva da un poco de miedo.</p>
            {/* <img src="/img/Historias/Historia1/entrar-cueva.png" alt="Cueva oscura" className="story-image"/> */}
            <div className="clickable-image-container">
              <div onClick={() => nextStep(6)} className="clickable-image">
                <img src="/img/Historias/Historia1/entrar-cueva.png" alt="Explorar más adentro" />
                <p>Explorar más adentro</p>
              </div>
              <div onClick={() => nextStep(7)} className="clickable-image">
                <img src="/img/Historias/Historia1/valle.png" alt="Volver afuera y buscar otra ruta" />
                <p>Volver afuera y buscar otra ruta</p>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className='his'>
            <p>-Tito: ¡Qué maravilla! Una cascada brillante. Esto es increíble.</p>
            <img src="/img/Historias/Historia1/tito.png" alt="Cascada" className="story-image"/>
            <img src="/img/Historias/Historia1/cascada.png" alt="Cascada" className="story-image"/>
            <button  onClick={() => onComplete()} className="clickable-image ">
              {/* <img src="/img/Historias/Historia1/volver-menu.png" alt="Volver al Menú" /> */}
              <p>salir </p>
            </button>
          </div>
        );
      case 6:
        return (
          <div className='his'>
            <p>-Dina: ¿Vamos más adentro? Podríamos encontrar algo valioso.</p>
            <p>-Rex: ¡Miren este tesoro antiguo! ¡Qué hallazgo!</p>
            <img src="/img/Historias/Historia1/dina.png" alt="Tesoro antiguo" className="story-image"/>
            <img src="/img/Historias/Historia1/rex.png" alt="Tesoro antiguo" className="story-image"/>
            <img src="/img/Historias/Historia1/tesoro.png" alt="Tesoro antiguo" className="story-image"/>
            <button onClick={() => onComplete()} className="clickable-image ">
              {/* <img src="/img/Historias/Historia1/volver-menu.png" alt="Volver al Menú" /> */}
              <p>Salir</p>
            </button>
          </div>
        );
      case 7:
        return (
          <div className='his'>
            <p>-Ali: Mejor volvamos afuera y busquemos otra ruta. Esta cueva da un poco de miedo.</p>
            <p>-Tito: ¡Encontramos una salida secreta! ¡Qué ingenioso!</p>
            <img src="/img/Historias/Historia1/camino-a-casa.png" alt="Salida secreta" className="story-image"/>
            <button onClick={() => onComplete()} className="clickable-image ">
             {/*  <img src="/img/Historias/Historia1/volver-menu.png" alt="Volver al Menú" /> */}
              <p>Salir</p>
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

export default Historia1;
