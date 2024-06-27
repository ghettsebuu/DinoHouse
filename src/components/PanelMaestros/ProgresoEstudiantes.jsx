// ProgresoEstudiantes.jsx
import React, { useState, useEffect } from 'react';
import './ProgresoEstudiantes.css';
import { db } from '../../Firebase/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../Services/AuthContext';

const ProgresoEstudiantes = ({ students }) => {
  const niveles = [
    "Reconocer las letras, vocales y Abecedario",
    "Reconocer sonidos, formar sílabas y palabras",
    "Comprensión lectora",
    "Comprensión y Fluidez"
  ];

  const [studentProgress, setStudentProgress] = useState([]);

  useEffect(() => {
    const fetchStudentProgress = async () => {
      try {
        const teacherId = students[0]?.MaestroID; // Usamos el primer estudiante para obtener el MaestroID
        const studentCodes = students.map(student => student.CodigoAcceso);
        const progressData = [];

        for (const code of studentCodes) {
          const progressQuery = query(collection(db, 'Puntuacion'), where('CodigoAcceso', '==', code));
          const progressSnapshot = await getDocs(progressQuery);
          progressSnapshot.forEach(doc => {
            progressData.push({ CodigoAcceso: doc.id, ...doc.data() });
          });
        }

        setStudentProgress(progressData);
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
        {students.map((student) => (
          <li key={student.id} className="student-progress-item">
            <div className="student-info">
              <span className="student-name">{student.Nombre} {student.Apellido}</span>
            </div>
            <div className="progress-info">
              {niveles.map((nivel, index) => {
                const studentProgressData = studentProgress.find(progress => progress.CodigoAcceso === student.CodigoAcceso);
                const progress = studentProgressData ? studentProgressData[`Level${index + 1}`] || 0 : 0;

                return (
                  <div key={index} className={`progress-level level-${index + 1}`}>
                    <span>{nivel}</span>
                    <div className="progress-bar-container">
                      <div
                        className="progress-bar"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgresoEstudiantes;
