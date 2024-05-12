// Dashboard.js (Componente principal)
import React, { useState, useEffect } from 'react';
import SidebarComponent from './Sidebar';
import SceneComponent from './Scene';
import { db } from '../../Firebase/firebaseConfig'; // Importa la instancia de Firestore
import { collection, getDocs } from 'firebase/firestore'; // Asegúrate de importar getDocs

import './PanelPlay.css';

const PanelPlay = () => {
  const [studentName, setStudentName] = useState('');

  useEffect(() => {
    const fetchStudentName = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Estudiantes'));
        querySnapshot.forEach((doc) => {
          const studentData = doc.data();
          // Suponiendo que el nombre del estudiante está en el campo 'Nombre'
          setStudentName(studentData.Nombre);
        });
      } catch (error) {
        console.error('Error al obtener nombre del estudiante:', error);
      }
    };

    fetchStudentName();
  }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez al montar el componente

  return (
    <div className="dashboard">
      <SidebarComponent 
        avatar="url_del_avatar" 
        Nombre={studentName} 
        level={1} 
      />
      <SceneComponent />
    </div>
  );
};

export default PanelPlay;
