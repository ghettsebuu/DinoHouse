import React from 'react';
import './Gestio.css'; // Ajusta el nombre del archivo CSS según lo que hayas nombrado

const StudentCards = ({ students, editStudent, deleteStudent }) => {
  return (
    <div className="student-cards">
      {students.map((student) => (
        <div className="student-card" key={student.id}>
          <div className="student-details">
            <h2>{student.Nombre} {student.Apellido}</h2>
            <p><strong>Código de Acceso:</strong> {student.CodigoAcceso}</p>
            <div className="card-actions">
              <button onClick={() => editStudent(student)}>Editar</button>
              <button onClick={() => deleteStudent(student.id)}>Eliminar</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentCards;
