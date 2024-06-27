// StudentList.js
import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import './StudentList.css';

const StudentList = ({ students, editStudent, deleteStudent }) => {
  return (
    <div className="student-list">
      <h1>Gestión de Estudiantes</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id} className="student-item">
            <div className="student-info">
              <span className="student-name">{student.Nombre} {student.Apellido}</span>
              <span className="student-code">Código de Acceso: {student.CodigoAcceso}</span>
            </div>
            <div className="student-actions">
              <FaEdit className="icon edit-icon" onClick={() => editStudent(student)} />
              <FaTrash className="icon delete-icon" onClick={() => deleteStudent(student.id)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;
