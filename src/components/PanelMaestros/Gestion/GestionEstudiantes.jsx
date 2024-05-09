  import React, { useState } from 'react';
  import './Gestio.css'
  import AddStudentModal from './AddStudentModal'
  import StudentTable from './StudentTable'
  
  
  // Componente principal de gestión de estudiantes
  const GestionEstudiantes = () => {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const addStudent = (student) => {
      setStudents([...students, student]);
      closeModal();
    };
  
    const editStudent = (index) => {
      // Implementar lógica de edición
    };
  
    const deleteStudent = (index) => {
      // Implementar lógica de eliminación
    };
  
    return (
      <div className='gestion'>
        <h1>Gestión de Estudiantes</h1>
        <button onClick={openModal}>Registrar</button>
        <StudentTable students={students} editStudent={editStudent} deleteStudent={deleteStudent} />
        <AddStudentModal isOpen={isModalOpen} onClose={closeModal} onSave={addStudent} />
      </div>
    );
  };
  
  export default GestionEstudiantes;
  
  