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
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [currentRound, setCurrentRound] = useState(1);

    const correctSound = new Audio('/sounds/correct-6033.mp3');
    const incorrectSound = new Audio('/sounds/wronganswer-37702.mp3');
    const finalSound = new Audio('/sounds/level-win-6416.mp3');

    const objectList = [
        { name: "Avion", letter: "A", image: "/img/ObjetosLv1/Avion.png" },
        { name: "Elefante", letter: "E", image: "/img/ObjetosLv1/Elefante.png" },
        { name: "Iman", letter: "I", image: "/img/ObjetosLv1/Iman.png" },
        { name: "Olla", letter: "O", image: "/img/ObjetosLv1/Olla.png" },
        { name: "Uvas", letter: "U", image: "/img/ObjetosLv1/Uvas.png" },
        
        
    ];

    useEffect(() => {
        setObjects(objectList);
        setLetterOptions(generateLetterOptions(objectList[0]));
    }, []);

    const handleDragStart = (event, letter) => {
        setDraggedLetter(letter);
    };

    const handleDrop = (event) => {
        event.preventDefault();
        setDroppedLetter(draggedLetter);
        setShowFeedback(true);
        if (draggedLetter === objects[currentObjectIndex].letter) {
            setCorrectAnswer(true);
            correctSound.play();
            setScore(prevScore => prevScore + 1);
            setTimeout(() => {
                setCorrectAnswer(false);
                setShowFeedback(false);
                setDroppedLetter('');
                if (currentObjectIndex === objects.length - 1) {
                    if (currentRound < 3) {
                        setCurrentRound(prevRound => prevRound + 1);
                        const newObjects = [...objects];
                        if (currentRound === 1) {
                            shuffleObjects(newObjects);
                        }
                        setObjects(newObjects);
                        setCurrentObjectIndex(0);
                        setLetterOptions(generateLetterOptions(newObjects[0]));
                    } else {
                        finalSound.play();
                        setShowFinalScreen(true);
                    }
                } else {
                    setCurrentObjectIndex(prevIndex => prevIndex + 1);
                    setLetterOptions(generateLetterOptions(objects[currentObjectIndex + 1]));
                }
            }, 1000);
        } else {
            setCorrectAnswer(false);
            incorrectSound.play();
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

    const shuffleObjects = (objectsList) => {
        for (let i = objectsList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [objectsList[i], objectsList[j]] = [objectsList[j], objectsList[i]];
        }
    };

    const restartActivity = () => {
        setShowFinalScreen(false);
        setCurrentObjectIndex(0);
        setLetterOptions(generateLetterOptions(objectList[0]));
        setScore(0);
        setShowFeedback(false);
        setCurrentRound(1);
        setObjects([...objectList]);
    };

    const goToHome = () => {
        mostrarActividad();
    };

    return (
        <section className='PlayScena'>
            {showFinalScreen ? (
                <FinalScreen onRestart={restartActivity} onGoToHome={goToHome} />
            ) : (
                <div className="actividad-lv1">
                  
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${(currentObjectIndex + 1) / objects.length * 100}%` }}></div>
                    </div>

                    <h2>¡Arrastra la Letra!</h2>
                    <div className="score">Puntuación: {score}</div>
                    <div className="object-image">
                        <img src={objects[currentObjectIndex]?.image} alt={objects[currentObjectIndex]?.name} className='imagen' />
                    </div>
                    <div className={`drop-area ${correctAnswer ? 'correct' : ''}`} onDrop={handleDrop} onDragOver={handleDragOver}>
                        {droppedLetter}
                    </div>
                    {showFeedback && <div className="feedback-message">{correctAnswer ? '¡Bravo!' : 'Intenta de nuevo'}</div>}
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
