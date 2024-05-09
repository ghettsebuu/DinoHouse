import React, { useState } from 'react';
  
  // Componente de la ventana modal para agregar estudiante
  const AddStudentModal = ({ isOpen, onClose, onSave }) => {
      const [nombre, setNombre] = useState('');
      const [apellido, setApellido] = useState('');
      const [codigoAcceso, setCodigoAcceso] = useState('');
      const [error, setError] = useState('');
      const [showAlert, setShowAlert] = useState(false);
      const [alertMessage, setAlertMessage] = useState('');
    
      const generarCodigo = () => {
        // Generar código único para el estudiante
        const codigo = Math.random().toString(36).substring(2, 10).toUpperCase();
        setCodigoAcceso(codigo);
        setAlertMessage('Código de acceso generado.');
        setShowAlert(true);
      };
    
      const handleSave = () => {
        
          // Verificar si nombre, apellido o código de acceso están vacíos
          if (nombre.trim() === '' || apellido.trim() === '' || codigoAcceso.trim() === '') {
            console.log('Mostrando ventana de alerta');
            setError('Por favor, complete todos los campos.');
            setAlertMessage('Por favor, complete todos los campos.');
            setShowAlert(true);
            return;
          }
        
          // Verificar si no se ha generado un código de acceso
          if (codigoAcceso.trim() === '') {
            setError('Por favor, genere un código de acceso.');
            setAlertMessage('Por favor, genere un código de acceso.');
            setShowAlert(true);
            return;
          }
        
          // Si todos los campos están llenos y se ha generado un código de acceso, guardar los datos
          setError('');
          onSave({ nombre, apellido, codigoAcceso });
          setNombre('');
          setApellido('');
          setCodigoAcceso('');
          onClose();
        };
        
    
      const handleChangeNombre = (e) => {
        // Evitar números y caracteres especiales en el campo de nombre
        const re = /^[A-Za-z\s]+$/;
        if (re.test(e.target.value) || e.target.value === '') {
          setNombre(e.target.value);
        }
      };
    
      const handleChangeApellido = (e) => {
        // Evitar números y caracteres especiales en el campo de apellido
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
  
  
  
  