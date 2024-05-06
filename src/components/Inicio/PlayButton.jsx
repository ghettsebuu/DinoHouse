// PlayButton.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PlayButton = () => {
  return (
    <Link to="/SelectLogin" className="play-button"> {/* Utiliza Link para redirigir a SelectLogin */}
    <i className="fa-solid fa-play"></i>
  </Link>
  );
};

export default PlayButton;
