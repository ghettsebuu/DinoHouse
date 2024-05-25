import React, { useState } from 'react';
import { db } from '../../../Firebase/firebaseConfig';  
import { collection, addDoc } from 'firebase/firestore'; 
import { auth } from '../../../Firebase/firebaseConfig'; // Asegúrate de importar auth

const AddStudentModal = ({ isOpen, onClose }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [codigoAcceso, setCodigoAcceso] = useState('');
    const [error, setError] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');

    const generarCodigo = () => {
        const codigo = Math.random().toString(36).substring(2, 10).toUpperCase();
        setCodigoAcceso(codigo);
        setAlertMessage('Código de acceso generado.');
        setShowAlert(true);
    };

    const handleSave = async () => {
        try {
            if (nombre.trim() === '' || apellido.trim() === '' || codigoAcceso.trim() === '') {
                setError('Por favor, complete todos los campos.');
                setAlertMessage('Por favor, complete todos los campos.');
                setShowAlert(true);
                return;
            }

            const teacherId = auth.currentUser.uid;

            await addDoc(collection(db, 'Estudiantes'), { 
                Nombre: nombre, 
                Apellido: apellido, 
                CodigoAcceso: codigoAcceso,
                MaestroID: teacherId 
            });

            setNombre('');
            setApellido('');
            setCodigoAcceso('');
            onClose();
        } catch (error) {
            console.error('Error al agregar estudiante:', error);
        }
    };

    const handleChangeNombre = (e) => {
        const re = /^[A-Za-z\s]+$/;
        if (re.test(e.target.value) || e.target.value === '') {
            setNombre(e.target.value);
        }
    };

    const handleChangeApellido = (e) => {
        const re = /^[A-Za-z\s]+$/;
        if (re.test(e.target.value) || e.target.value === '') {
            setApellido(e.target.value);
        }
    };

    return (
        isOpen && (
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={onClose}>&times;</span>
                    <div className="section">
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" value={nombre} onChange={handleChangeNombre} />
                    </div>
                    <div className="section">
                        <label htmlFor="apellido">Apellido:</label>
                        <input type="text" id="apellido" value={apellido} onChange={handleChangeApellido} />
                    </div>
                    <div className="section">
                        <input type="text" id="codigoAcceso" value={codigoAcceso} readOnly />
                        <button onClick={() => generarCodigo()}>Generar Código</button>
                    </div>
                    {error && <p className="error">{error}</p>}
                    {showAlert && <p className="alert">{alertMessage}</p>}
                    <div className="section">
                        <button onClick={handleSave} disabled={!nombre || !apellido}>Guardar</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default AddStudentModal;
