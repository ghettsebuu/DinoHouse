// HomeScreen.jsx
import React from 'react';
import './HomeScreen.css';
import HouseImage from './HouseImage';
import PlayButton from './PlayButton';
import DinaImage from './DinaImage';
import TitoImage from './TitoImage';
import RexImage from './RexImage';
import  AliImage from './AliImage';
import  DadosImage from './DadosImage';

const HomeScreen = () => {
  return (
    <div className="home-screen">
      <div className="title-container">
          <h1 className="title">DinoHouse</h1>
      </div>
      <div className="centro-elementos overlay">
        <HouseImage />
        <PlayButton />
      </div>
      <div className="dinos-elementos">
        <AliImage />
        <RexImage />
        <DadosImage />
        <DinaImage />
        <TitoImage />
      </div>
      
      
    </div>
  );
};

export default HomeScreen;
