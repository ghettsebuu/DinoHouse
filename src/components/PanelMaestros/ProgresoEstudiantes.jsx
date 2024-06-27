import React, { useState, useEffect } from 'react';
import './ProgresoEstudiantes.css';
import { db } from '../../Firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../Services/AuthContext';

const ProgresoEstudiantes = ({ students }) => {
  const niveles = [
    "Reconocer las letras, vocales y Abecedario",
    "Reconocer sonidos, formar sílabas y palabras",
    "Comprensión lectora",
    "Comprensión y Fluidez"
  ];

  const MAX_POINTS_PER_LEVEL = 1000;

  const [studentProgress, setStudentProgress] = useState([]);

  useEffect(() => {
    const fetchStudentProgress = async () => {
      try {
        const progressCollection = collection(db, 'Puntuacion');
        const progressSnapshot = await getDocs(progressCollection);
        const progressData = progressSnapshot.docs.map(doc => ({ CodigoAcceso: doc.id, ...doc.data() }));

        const mappedProgress = students.map(student => {
          const studentProgressData = progressData.find(progress => progress.CodigoAcceso === student.CodigoAcceso);
          return {
            ...student,
            progress: studentProgressData || {}
          };
        });

        setStudentProgress(mappedProgress);
      } catch (error) {
        console.error('Error al obtener el progreso de los estudiantes:', error);
      }
    };

    if (students.length > 0) {
      fetchStudentProgress();
    }
  }, [students]);

  return (
    <div className="progreso-estudiantes">
      <h1>Progreso de Estudiantes</h1>
      <ul className="student-progress-list">
        {studentProgress.map((student) => (
          <li key={student.id} className="student-progress-item">
            <div className="student-info">
              <span className="student-name">{student.Nombre} {student.Apellido}</span>
            </div>
            <div className="progress-info">
              {niveles.map((nivel, index) => {
                const points = student.progress[`Level${index + 1}`] || 0;
                const progressPercentage = (points / MAX_POINTS_PER_LEVEL) * 100;
                return (
                  <div key={index} className={`progress-level level-${index + 1}`}>
                    <span>{nivel}</span>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                    <span>{points} / {MAX_POINTS_PER_LEVEL}</span>
                  </div>
                );
              })}
              <div className="fecha-mas-reciente">
                <span>Fecha más reciente: {student.progress.fechaMasReciente || 'No disponible'}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgresoEstudiantes;
