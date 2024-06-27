// LoginMaestro.js
import React, { useEffect } from 'react';
import './login.css';
import { useAuth } from '../../Services/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginMaestro = () => {
  const { user, googleSignIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/PanelM');
    }
  }, [user, navigate]);

  return (
    <div className="login-maestro-container">
      <button onClick={googleSignIn} className="google-login-button">
        <span className="google-icon"></span> Iniciar sesión con Google
      </button>
    </div>
  );
};

export default LoginMaestro;
