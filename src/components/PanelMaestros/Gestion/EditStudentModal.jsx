import React, { useState, useEffect } from 'react';

const EditStudentModal = ({ isOpen, onClose, student, onSave }) => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [codigoAcceso, setCodigoAcceso] = useState('');

    useEffect(() => {
        if (student) {
            setNombre(student.Nombre);
            setApellido(student.Apellido);
            setCodigoAcceso(student.CodigoAcceso);
        }
    }, [student]);

    const handleSave = () => {
        const updatedStudent = { ...student, Nombre: nombre, Apellido: apellido, CodigoAcceso: codigoAcceso };
        onSave(updatedStudent);
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
                    </div>
                    <div className="section">
                        <button onClick={handleSave} disabled={!nombre || !apellido}>Guardar</button>
                    </div>
                </div>
            </div>
        )
    );
};

export default EditStudentModal;
