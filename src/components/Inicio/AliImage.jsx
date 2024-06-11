// AliImage.jsx
import React from 'react';

const AliImage = ({ onClick }) => {
  return (
    <img 
      src="/img/dinoAli.png"
      alt="Ali" 
      className="Ali-image dinos dinosaur-animation "
      onClick={onClick} 
    />
  ); 
};

export default AliImage;
