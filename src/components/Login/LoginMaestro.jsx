// Componente LoginMaestro
import React, { useEffect } from 'react';
import './login.css'; // Archivo CSS para estilos personalizados
import { UserAuth } from '../../Services/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginMaestro = () => {
  const navigate = useNavigate();
   const {user,googleSingnIn}= UserAuth();
   const iniciarSesion=async()=>{
    try {
      await googleSingnIn();
    } catch (error) {
      console.log(error)
    }
   }

   useEffect(()=>{
    if(user!=null){
      navigate("/PanelM")
    }

   },[user])
    return (
      <div className="login-maestro-container">
        <button onClick={iniciarSesion} className="google-login-button">
         <span className="google-icon"></span>  Iniciar sesión con Google
        </button>
      </div>
    );
  };

  export default LoginMaestro ;