// HomeScreen.js
import React from 'react';
import './HomeScreen.css'; // Importa los estilos específicos del componente

const HomeScreen = () => {
  return (
    <div className="home-screen">
      <div className="background"></div>
      <img src="/img/home.png"  alt="Casita" className="house-image" />
      <button className="play-button">
        <i class="fa-solid fa-play"></i>
      </button>
      <img src="/img/dinonaranja1.png"  alt="Casita" className="dinonaranja-image" />
      <div className="dinosaur-animation left2"></div>
      <div className="dinosaur-animation right"></div>
      <div className="dinosaur-animation right2"></div>
    </div>
  );
};

export default HomeScreen;
