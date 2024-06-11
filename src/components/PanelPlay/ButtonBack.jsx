// src/components/BackButtonComponent.jsx
import React from 'react';
import './PanelPlay.css';

const BackButtonComponent = ({ onClick }) => {
    return (
        <button className="back-button button" onClick={onClick}>
            <i className="fa-solid fa-chevron-left"></i>
        </button>
    );
};

export default BackButtonComponent;
