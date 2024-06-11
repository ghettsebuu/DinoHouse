// DinaImage.jsx
import React from 'react';

const DinaImage = ({ onClick }) => {
  return (
    <img 
      src="/img/dinonaranja1.png" 
      alt="Dina" 
      className="dina-image dinos dinosaur-animation" 
      onClick={onClick} 
    />
  ); 
};

export default DinaImage;
