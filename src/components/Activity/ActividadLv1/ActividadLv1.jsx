import React, { useState, useEffect } from 'react';
import './ActividadLv1.css';
import FinalScreen from './Final.jsx';

const ActividadLv1 = ({ mostrarActividad }) => {
    const [draggedLetter, setDraggedLetter] = useState('');
    const [droppedLetter, setDroppedLetter] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(false);
    const [objects, setObjects] = useState([]);
    const [currentObjectIndex, setCurrentObjectIndex] = useState(0);
    const [letterOptions, setLetterOptions] = useState([]);
    const [showFinalScreen, setShowFinalScreen] = useState(false);

    useEffect(() => {
        const objectList = [
            { name: "Avion", letter: "A", image: "/img/ObjetosLv1/Avion.png" },
            { name: "Elefante", letter: "E", image: "/img/ObjetosLv1/Elefante.png" },
            { name: "Iman", letter: "I", image: "/img/ObjetosLv1/Iman.png" },
            { name: "Olla", letter: "O", image: "/img/ObjetosLv1/Olla.png" },
            { name: "Uvas", letter: "U", image: "/img/ObjetosLv1/Uvas.png" },
        ];

        setObjects(objectList);
        setLetterOptions(generateLetterOptions(objectList[0]));

    }, []);

    const handleDragStart = (event, letter) => {
        setDraggedLetter(letter);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDroppedLetter(draggedLetter);
        if (draggedLetter === objects[currentObjectIndex].letter) {
            setCorrectAnswer(true);
            setTimeout(() => {
                setCorrectAnswer(false);
                if (currentObjectIndex === objects.length - 1) {
                    setShowFinalScreen(true);
                } else {
                    setCurrentObjectIndex(prevIndex => prevIndex + 1);
                    setLetterOptions(generateLetterOptions(objects[currentObjectIndex + 1]));
                }
            }, 1000);
        } else {
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
    
        const filteredLetters = allLetters.filter(letter => letter !== correctLetter);
    
        const randomAdditionalLetters = [];
        while (randomAdditionalLetters.length < 3) {
            const randomIndex = Math.floor(Math.random() * filteredLetters.length);
            const randomLetter = filteredLetters[randomIndex];
            if (!randomAdditionalLetters.includes(randomLetter)) {
                randomAdditionalLetters.push(randomLetter);
            }
        }
    
        const options = [correctLetter, ...randomAdditionalLetters];
        const shuffledOptions = options.sort(() => Math.random() - 0.5);
    
        return shuffledOptions;
    };

    const restartActivity = () => {
        setShowFinalScreen(false);
        setCurrentObjectIndex(0);
        setLetterOptions(generateLetterOptions(objects[0]));
    };

    const goToHome = () => {
        mostrarActividad(); // Llama a la función proporcionada desde SceneComponent
    };

    return (
        <section className='PlayScena'>
            {showFinalScreen ? (
                <FinalScreen onRestart={restartActivity} onGoToHome={goToHome} />
            ) : (
                <div className="actividad-lv1">
                    <h2>¡Arrastra la Letra!</h2>
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
            )}
            <img src="/img/dinoazul2.png" alt="Rex" className='Dino' />
        </section>
    );
}

export default ActividadLv1;
