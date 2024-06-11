// TitoImage.jsx
import React from 'react';

const TitoImage = ({ onClick }) => {
  return (
    <img 
      src="/img/dinoverde.png" 
      alt="Tito" 
      className="Tito-image dinos dinosaur-animation "
      onClick={onClick} 
    />
  ); 
};

export default TitoImage;
