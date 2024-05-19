import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireStudentAuth = ({ children }) => {
  const studentName = localStorage.getItem('studentName');
  
  if (!studentName) {
    // Redirige al usuario a la página de inicio de sesión si no está autenticado
    return <Navigate to="/LoginEstudiante" />;
  }

  return children;
};

export default RequireStudentAuth;
