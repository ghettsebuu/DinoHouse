// src/components/SidebarComponent.js
import React from 'react';
import HomeButtonComponent from './ButtonHome';
import ExitButtonComponent from './ButtonExit';
import BackButtonComponent from './ButtonBack';
import './PanelPlay.css';

const ButtonPanel = ({  onBackButtonClick, buttonvisible }) => {


  return (
    <div className={`"sidebar" ${buttonvisible}`}>
      <div className="button-container">
          <BackButtonComponent onClick={onBackButtonClick} />
          <HomeButtonComponent />
          <ExitButtonComponent />
      </div>
    </div>
  );
};

export default ButtonPanel;
