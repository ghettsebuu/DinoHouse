import React, { useState, useEffect } from 'react';
import './Gestio.css';
import AddStudentModal from './AddStudentModal';
import StudentTable from './StudentTable';
import { db } from '../../../Firebase/firebaseConfig'; // Ajusta la ruta según la estructura de tu proyecto
import { collection, getDocs } from 'firebase/firestore';


// Componente principal de gestión de estudiantes
const GestionEstudiantes = () => {
  const [students, setStudents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
      const fetchStudents = async () => {
          try {
              const studentsSnapshot = await getDocs(collection(db, 'Estudiantes')); // Utiliza db en lugar de firestore
              const studentsData = studentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
              setStudents(studentsData);
          } catch (error) {
              console.error('Error al obtener estudiantes:', error);
          }
      };

      fetchStudents();
  }, []);

  const openModal = () => {
      setIsModalOpen(true);
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };

  const addStudent = async (student) => {
      try {
          const newStudentRef = await addDoc(collection(db, 'Estudiantes'), student); // Utiliza db en lugar de firestore
          const newStudent = { id: newStudentRef.id, ...student };
          setStudents([...students, newStudent]);
          closeModal();
      } catch (error) {
          console.error('Error al agregar estudiante:', error);
      }
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