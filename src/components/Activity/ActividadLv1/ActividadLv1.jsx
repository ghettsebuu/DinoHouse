import React, { useState, useEffect } from 'react';
import './ActividadLv1.css'; // Archivo de estilos

const ActividadLv1 = () => {
    const [draggedLetter, setDraggedLetter] = useState(''); // Estado para la letra arrastrada
    const [droppedLetter, setDroppedLetter] = useState(''); // Estado para la letra soltada en la casilla
    const [correctAnswer, setCorrectAnswer] = useState(false); // Estado para indicar si la respuesta es correcta
    const [objects, setObjects] = useState([]); // Estado para almacenar los objetos
    const [currentObjectIndex, setCurrentObjectIndex] = useState(0); // Estado para mantener el índice del objeto actual
    const [letterOptions, setLetterOptions] = useState([]); // Estado para las opciones de letras

    useEffect(() => {
        // Lista de objetos con sus nombres, letras iniciales y rutas de las imágenes
        const objectList = [
            { name: "Avion", letter: "A", image: "/img/ObjetosLv1/Avion.png" },
            { name: "Elefante", letter: "E", image: "/img/ObjetosLv1/Elefante.png" },
            { name: "Iman", letter: "I", image: "/img/ObjetosLv1/Iman.png" },
            { name: "Olla", letter: "O", image: "/img/ObjetosLv1/Olla.png" },
            { name: "Uvas", letter: "U", image: "/img/ObjetosLv1/Uvas.png" },
            // Agrega más objetos si es necesario
        ];

        // Establecer los objetos seleccionados en el estado
        setObjects(objectList);

        // Generar las opciones de letras para el primer objeto
        setLetterOptions(generateLetterOptions(objectList[0]));

    }, []); // Esta función se ejecuta solo una vez al cargar el componente

    const handleDragStart = (event, letter) => {
        setDraggedLetter(letter);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDroppedLetter(draggedLetter); // Almacenar la letra soltada en la casilla
        if (draggedLetter === objects[currentObjectIndex].letter) {
            // Si la respuesta es correcta, mostrar el siguiente objeto
            setCorrectAnswer(true);
            setTimeout(() => {
                setCorrectAnswer(false);
                setCurrentObjectIndex(prevIndex => prevIndex + 1);
                // Generar las nuevas opciones de letras para el siguiente objeto
                setLetterOptions(generateLetterOptions(objects[currentObjectIndex + 1]));
            }, 1000); // Cambiar al siguiente objeto después de 1 segundo
        } else {
            // Si la respuesta es incorrecta, mostrar un mensaje de error
            setCorrectAnswer(false);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const generateLetterOptions = (currentObject) => {
        if (!currentObject) {
            return [];
        }
        
        const correctLetter = currentObject.letter;
        const allLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ñ', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    
        // Filtrar las letras para excluir la letra correcta y eliminar repeticiones
        const filteredLetters = allLetters.filter(letter => letter !== correctLetter);
    
        // Seleccionar tres letras aleatorias adicionales
        const randomAdditionalLetters = [];
        while (randomAdditionalLetters.length < 3) {
            const randomIndex = Math.floor(Math.random() * filteredLetters.length);
            const randomLetter = filteredLetters[randomIndex];
            if (!randomAdditionalLetters.includes(randomLetter)) {
                randomAdditionalLetters.push(randomLetter);
            }
        }
    
        // Combinar la letra correcta con las letras aleatorias
        const options = [correctLetter, ...randomAdditionalLetters];
    
        // Barajar las opciones de letras aleatoriamente
        const shuffledOptions = options.sort(() => Math.random() - 0.5);
    
        return shuffledOptions;
    };
    

    return (
        <section className='PlayScena'>
             <h2>¡Arrastra la Letra!</h2>
            <div className="actividad-lv1">
                <div className="object-image">
                    <img src={objects[currentObjectIndex]?.image} alt={objects[currentObjectIndex]?.name} className='imagen' />
                </div>
                <div className={`drop-area ${correctAnswer ? 'correct' : ''}`} onDrop={handleDrop} onDragOver={handleDragOver}>
                    {droppedLetter}
                </div>
                <div className="feedback-message">{correctAnswer ? '¡Bravo!' : 'Intenta de nuevo'}</div>
                <div className="letters-container">
                    {letterOptions.map((letter, index) => (
                        <div key={index} className="letter" draggable onDragStart={(e) => handleDragStart(e, letter)}>{letter}</div>
                    ))}
                </div>
            </div>
            <img src="/img/dinoazul2.png" alt="Rex" className='Dino' />
        </section>
    );
}

export default ActividadLv1;
