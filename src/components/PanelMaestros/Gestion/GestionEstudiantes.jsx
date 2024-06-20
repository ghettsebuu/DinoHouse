import React, { useState, useEffect } from 'react';
import './Gestio.css';
import AddStudentModal from './AddStudentModal';
import EditStudentModal from './EditStudentModal'; // Importa el modal de edición
import StudentCards from './StudentCards';
import { db } from '../../../Firebase/firebaseConfig'; 
import { collection, getDocs, query, where, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { auth } from '../../../Firebase/firebaseConfig'; 

const GestionEstudiantes = () => {
    const [students, setStudents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Estado para el modal de edición
    const [currentStudent, setCurrentStudent] = useState(null); // Estado para el estudiante actual a editar

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const teacherId = auth.currentUser.uid;
                const studentsQuery = query(collection(db, 'Estudiantes'), where('MaestroID', '==', teacherId));
                const studentsSnapshot = await getDocs(studentsQuery);
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

    const openEditModal = (student) => {
        setCurrentStudent(student);
        setIsEditModalOpen(true);
    };

    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setCurrentStudent(null);
    };

    const addStudent = async (student) => {
        try {
            const teacherId = auth.currentUser.uid;
            const newStudent = { ...student, MaestroID: teacherId };
            
            const newStudentRef = await addDoc(collection(db, 'Estudiantes'), newStudent);
            setStudents([...students, { id: newStudentRef.id, ...newStudent }]);
            closeModal();
        } catch (error) {
            console.error('Error al agregar estudiante:', error);
        }
    };

    const updateStudent = async (updatedStudent) => {
        try {
            const studentRef = doc(db, 'Estudiantes', updatedStudent.id);
            await updateDoc(studentRef, updatedStudent);
            setStudents(students.map(student => (student.id === updatedStudent.id ? updatedStudent : student)));
            closeEditModal();
        } catch (error) {
            console.error('Error al actualizar estudiante:', error);
        }
    };

    const deleteStudent = async (studentId) => {
        try {
            await deleteDoc(doc(db, 'Estudiantes', studentId));
            setStudents(students.filter(student => student.id !== studentId));
        } catch (error) {
            console.error('Error al eliminar estudiante:', error);
        }
    };

    return (
        <div className='gestion'>
            <h1>Gestión de Estudiantes</h1>
            <button onClick={openModal}>Registrar</button>
            <StudentCards students={students} editStudent={openEditModal} deleteStudent={deleteStudent} />
            <AddStudentModal isOpen={isModalOpen} onClose={closeModal} onSave={addStudent} />
            <EditStudentModal isOpen={isEditModalOpen} onClose={closeEditModal} student={currentStudent} onSave={updateStudent} />
        </div>
    );
};

export default GestionEstudiantes;
