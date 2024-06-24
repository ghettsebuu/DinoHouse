// src/components/Activity/ActividadLv4/HistoriasInteractivas.jsx
import React, { useState } from 'react';
import Historia1 from './Historia1';
import Historia2 from './Historia2';
/* import Historia3 from './Historia3';
import Historia4 from './Historia4'; */
import './historiasInteractivas.css';

const HistoriasInteractivas = ({ mostrarHistorias }) => {
  const [currentStory, setCurrentStory] = useState(null);
  const [completedStories, setCompletedStories] = useState([false, false, false, false]);

  const handleStoryClick = (storyIndex, StoryComponent) => {
    if (completedStories[storyIndex - 1] || storyIndex === 0) {
      setCurrentStory({ component: StoryComponent, index: storyIndex });
    }
  };

  const handleStoryComplete = () => {
    setCompletedStories(prevState => {
      const newState = [...prevState];
      newState[currentStory.index] = true;
      return newState;
    });
    setCurrentStory(null);
  };

  return (
    <div className="historias-interactivas">
      {currentStory ? (
        <currentStory.component onComplete={handleStoryComplete} />
      ) : (
        <div className="historias-menu">
          <h2>Selecciona una Historia</h2>
          <div className="historias-lista">
            <div 
              onClick={() => handleStoryClick(0, Historia1)} 
              className={`historia-item ${completedStories[0] ? '' : 'bloqueada'}`}>
              Historia 1: "El Misterio del Valle Perdido"
            </div>
            <div 
              onClick={() => handleStoryClick(1, Historia2)} 
              className={`historia-item ${completedStories[1] ? '' : 'bloqueada'}`}>
              Historia 2: "La Amistad de las Estrellas"
            </div>
       {/*      <div 
              onClick={() => handleStoryClick(2, Historia3)} 
              className={`historia-item ${completedStories[2] ? '' : 'bloqueada'}`}>
              Historia 3: "La Prueba de Coraje en el Bosque Encantado"
            </div>
            <div 
              onClick={() => handleStoryClick(3, Historia4)} 
              className={`historia-item ${completedStories[3] ? '' : 'bloqueada'}`}>
              Historia 4: "El Misterio del Volcán Dormido"
            </div> */}
          </div>
         
        </div>
      )}
    </div>
  );
};

export default HistoriasInteractivas;
