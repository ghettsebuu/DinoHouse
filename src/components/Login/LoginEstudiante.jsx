import React, { useState } from 'react';
import './login.css'; // Archivo CSS para estilos personalizados
import { collection, query, where, getDocs } from 'firebase/firestore'; // Importa métodos necesarios de Firestore
import { db } from '../../Firebase/firebaseConfig'; // Importa la instancia de Firestore
import { useNavigate } from 'react-router-dom'; // Importa useNavigate desde React Router

const LoginEstudiante = () => {
    const [codigoAcceso, setCodigoAcceso] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Obtiene la función navigate para cambiar la ruta

    const handleLogin = async () => {
        try {
            console.log('Intentando iniciar sesión...');
         /*    console.log('Código de acceso:', codigoAcceso); */
    
            const studentsRef = collection(db, 'Estudiantes');
            const q = query(studentsRef, where('CodigoAcceso', '==', codigoAcceso));
            const querySnapshot = await getDocs(q);
    
            if (querySnapshot.empty) {
                setError('Código de acceso no válido');
                console.log('Error: Código de acceso no válido');
                return;
            }
    
            let studentData = null;
            querySnapshot.forEach((doc) => {
                studentData = doc.data();
            });
    
            if (studentData) {
                localStorage.setItem('studentName', studentData.Nombre);
                localStorage.setItem('studentCodigoAcceso', codigoAcceso); // Guarda el código de acceso
    
                navigate('/PanelPlay');
            }
        } catch (error) {
            setError('Error al iniciar sesión');
            console.error('Error al iniciar sesión:', error);
        }
    };
    

    return (
        <div className="login-estudiante-container">
            <h2>Hola amiguito</h2>
            <input type="text" placeholder="Código de Acceso" value={codigoAcceso} onChange={(e) => setCodigoAcceso(e.target.value)} />
            <button className="submit-code-button" onClick={handleLogin}>Iniciar Sesión</button>
            {error && <p className="error">{error}</p>}
            <p className="info-text">Ingrese el código proporcionado por el maestro</p>
        </div>
    );
};

export default LoginEstudiante;