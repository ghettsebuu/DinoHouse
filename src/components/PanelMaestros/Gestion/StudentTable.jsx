import React from 'react';
  
  // Componente de la tabla de estudiantes
  const StudentTable = ({ students, editStudent, deleteStudent }) => {
      return (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Código de Acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.nombre}</td>
                <td>{student.apellido}</td>
                <td>{student.codigoAcceso}</td>
                <td>
                  <button onClick={() => editStudent(index)}>Editar</button>
                  <button onClick={() => deleteStudent(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    };
  
    export default StudentTable;