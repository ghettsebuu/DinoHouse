// ProgresoEstudiantes.js
import React from 'react';
import './ProgresoEstudiantes.css';

const ProgresoEstudiantes = ({ students }) => {
  const niveles = [
    "Reconocer las letras, vocales y Abecedario",
    "Reconocer sonidos, formar sílabas y palabras",
    "Comprensión lectora",
    "Comprensión y Fluidez"
  ];

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
              {niveles.map((nivel, index) => (
                <div key={index} className={`progress-level level-${index + 1}`}>
                  <span>{nivel}</span>
                  <div className="progress-bar-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${(student.nivelActual >= index + 1 ? 100 : (student.nivelActual === index ? student.progresoNivelActual : 0))}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgresoEstudiantes;
