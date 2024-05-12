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
                        <td>{student.Nombre}</td>
                        <td>{student.Apellido}</td>
                        <td>{student.CodigoAcceso}</td>
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