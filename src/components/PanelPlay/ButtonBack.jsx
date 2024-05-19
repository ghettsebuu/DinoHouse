import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PanelPlay.css';

const BackButtonComponent = () => {
    const navigate = useNavigate();

    const cerrarSesion = () => {
        try {
            localStorage.removeItem('studentName');
            navigate('/SelectLogin'); // Redirige a la página de selección de login
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <button onClick={cerrarSesion} className="back-button button">
            <i className="fa-solid fa-right-from-bracket"></i>
        </button>
    );
};

export default BackButtonComponent;
