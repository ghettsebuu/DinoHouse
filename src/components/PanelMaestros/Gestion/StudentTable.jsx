import React from 'react';

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
                {students.map((student) => (
                    <tr key={student.id}>
                        <td>{student.Nombre}</td>
                        <td>{student.Apellido}</td>
                        <td>{student.CodigoAcceso}</td>
                        <td>
                            <button onClick={() => editStudent(student)}>Editar</button>
                            <button onClick={() => deleteStudent(student.id)}>Eliminar</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default StudentTable;
