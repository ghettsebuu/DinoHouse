// src/components/Activity/ActividadLv4/HistoriasInteractivas.jsx
import React, { useState } from 'react';
import Historia1 from './Historia1';
/* import Historia2 from './Historia2'; */
/* import Historia3 from './Historia3';
import Historia4 from './Historia4'; */
import './historiasInteractivas.css';

const HistoriasInteractivas = () => {
  const [currentStory, setCurrentStory] = useState(null);

  const handleStoryClick = (StoryComponent) => {
    setCurrentStory({ component: StoryComponent });
  };

  const handleStoryComplete = () => {
    setCurrentStory(null);
  };

  return (
    <div className="historias-interactivas">
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
