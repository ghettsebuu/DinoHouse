// RexImage.jsx
import React from 'react';

const RexImage = ({ onClick }) => {
  return (
    <img 
      src="/img/dinoazul2.png" 
      alt="DinoRex" 
      className="rex-image dinos dinosaur-animation" 
      onClick={onClick} 
    />
  ); 
};

export default RexImage;
