// Inicio.jsx
import React from 'react';
import './Inicio.css';
import HouseImage from './HouseImage';
import PlayButton from './PlayButton';
import DinaImage from './DinaImage';
import TitoImage from './TitoImage';
import RexImage from './RexImage';
import AliImage from './AliImage';
import DadosImage from './DadosImage';
import { useAuth } from '../../Services/AuthContext';
import { useNavigate } from 'react-router-dom';

const Inicio = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBubbleClick = () => {
    if (user) {
      navigate('/PanelM');
    } else {
      navigate('/LoginMaestro');
    }
  };

  return (
    <div className="home-screen">
      <div className="title-container">
        <h1 className="title">DinoHouse</h1>
      </div>
      <div className="centro-elementos overlay">
        <HouseImage />
        <PlayButton />
      </div>
      {/* <div className="dinos-elementos">
        <AliImage />
        <RexImage />
        <DadosImage />
        <DinaImage />
        <TitoImage />
      </div> */}
      <div className="user-bubble" onClick={handleBubbleClick}>
        {user ? (
          <>
            <img src={user.photoURL} alt="User Avatar" className="user-avatar" />
            <span>{user.displayName}</span>
          </>
        ) : (
          <span>Iniciar como maestro</span>
        )}
      </div>
    </div>
  );
};

export default Inicio;
