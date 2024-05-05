// Componente LoginEstudiante
import React from 'react';
import './login.css'; // Archivo CSS para estilos personalizados

const LoginEstudiante = () => {
    return (
      <div className="login-estudiante-container">
        <input type="text" placeholder="Ingresa el código" />
        <button className="submit-code-button">Enviar código</button>
        <p className="info-text">Ingrese el código proporcionado por el maestro</p>
      </div>
    );
  };

  export default LoginEstudiante ;