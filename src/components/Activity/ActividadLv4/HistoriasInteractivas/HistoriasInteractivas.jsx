// src/components/Activity/ActividadLv4/HistoriasInteractivas.jsx
import React, { useState , useEffect } from 'react';
import Historia1 from './Historia1';
/* import Historia2 from './Historia2'; */
/* import Historia3 from './Historia3';
import Historia4 from './Historia4'; */
import './historiasInteractivas.css';
import AudioPlayer from '../../../../helpers/AudioPlayer'; 

const HistoriasInteractivas = () => {
  const [audioKey, setAudioKey] = useState('Historias'); // Estado para el audio actual
  const [currentStory, setCurrentStory] = useState(null);

  useEffect(() => {
    // Reproducir audio de instrucciones después del audio de bienvenida
    if (audioKey === 'Historias') {
      const timer = setTimeout(() => {
        setAudioKey('ClicHistoria');
      }, 3000); // Ajusta el tiempo según la duración del audio de bienvenida
      return () => clearTimeout(timer);
    }
    if (audioKey === 'ClicHistoria') {
      const timer = setTimeout(() => {
        setAudioKey('InstruccionHistorias');
      }, 4000); // Ajusta el tiempo según la duración del audio de bienvenida
      return () => clearTimeout(timer);
    }
  
  }, [audioKey]);

  const handleStoryClick = (StoryComponent) => {
    setCurrentStory({ component: StoryComponent });
    setAudioKey('VallePerdido');
  };

  const handleStoryComplete = () => {
    setCurrentStory(null);
  };

  return (
    <div className="historias-interactivas">
       <AudioPlayer audioKey={audioKey} />
      {currentStory ? (
        <currentStory.component onComplete={handleStoryComplete} />
      ) : (
        <div className="historias-menu">
          <h2>Selecciona la Historia</h2>
          <div className="historias-lista">
            <div 
              onClick={() => handleStoryClick(Historia1)} 
              className="historia-item">
              Historia 1: "El Misterio del Valle Perdido"
            </div>
          {/*   <div 
              onClick={() => handleStoryClick(Historia2)} 
              className="historia-item">
              Historia 2: "La Amistad de las Estrellas"
            </div> */}
       {/*     <div 
              onClick={() => handleStoryClick(Historia3)} 
              className="historia-item">
              Historia 3: "La Prueba de Coraje en el Bosque Encantado"
            </div>
            <div 
              onClick={() => handleStoryClick(Historia4)} 
              className="historia-item">
              Historia 4: "El Misterio del Volcán Dormido"
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoriasInteractivas;
