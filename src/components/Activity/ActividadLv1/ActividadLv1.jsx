// ActividadLv1.js
import React, { useState, useEffect } from 'react';
import './ActividadLv1.css';
import FinalScreen from '../Final.jsx';
import guardarPuntuacion from '../../../helpers/guardarPuntuacion.jsx'; // Importar la función de guardar puntuación

const ActividadLv1 = ({ mostrarActividad, onNextActivity }) => {
    const [draggedLetter, setDraggedLetter] = useState('');
    const [droppedLetter, setDroppedLetter] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState(false);
    const [currentObjectIndex, setCurrentObjectIndex] = useState(0);
    const [letterOptions, setLetterOptions] = useState([]);
    const [showFinalScreen, setShowFinalScreen] = useState(false);
    const [score, setScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [currentRound, setCurrentRound] = useState(0);
    const [roundObjects, setRoundObjects] = useState([]);

    const correctSound = new Audio('/sounds/correct-6033.mp3');
    const incorrectSound = new Audio('/sounds/wronganswer-37702.mp3');
    const finalSound = new Audio('/sounds/level-win-6416.mp3');

    const objectList = [
        { name: "Abeja", letter: "A", image: "/img/ObjetosLv1/Abeja.png" },
        { name: "Avion", letter: "A", image: "/img/ObjetosLv1/Avion.png" },
        { name: "Bicicleta", letter: "B", image: "/img/ObjetosLv1/Bicicleta.png" },
        { name: "Botas", letter: "B", image: "/img/ObjetosLv1/Botas.png" },
        { name: "Carro", letter: "C", image: "/img/ObjetosLv1/Carro.png" },
        { name: "Casa", letter: "C", image: "/img/ObjetosLv1/Casa.png" },
        { name: "Delfin", letter: "D", image: "/img/ObjetosLv1/Delfin.png" },
        { name: "Dinosaurio", letter: "D", image: "/img/ObjetosLv1/Dinosaurio.png" },
        { name: "Elefante", letter: "E", image: "/img/ObjetosLv1/Elefante.png" },
        { name: "Erizo", letter: "E", image: "/img/ObjetosLv1/Erizo.png" },
        { name: "Flauta", letter: "F", image: "/img/ObjetosLv1/Flauta.png" },
        { name: "Flores", letter: "F", image: "/img/ObjetosLv1/Flores.png" },
        { name: "Gato", letter: "G", image: "/img/ObjetosLv1/Gato.png" },
        { name: "Guayaba", letter: "G", image: "/img/ObjetosLv1/Guayaba.png" },
        { name: "Hielo", letter: "H", image: "/img/ObjetosLv1/Hielo.png" },
        { name: "Hormiga", letter: "H", image: "/img/ObjetosLv1/Hormiga.png" },
        { name: "Iguana", letter: "I", image: "/img/ObjetosLv1/Iguana.png" },
        { name: "Iman", letter: "I", image: "/img/ObjetosLv1/Iman.png" },
        { name: "Jabon", letter: "J", image: "/img/ObjetosLv1/Jabon.png" },
        { name: "Jirafa", letter: "J", image: "/img/ObjetosLv1/Jirafa.png" },
        { name: "Karate", letter: "K", image: "/img/ObjetosLv1/Karate.png" },
        { name: "Koala", letter: "K", image: "/img/ObjetosLv1/Koala.png" },
        { name: "Lampara", letter: "L", image: "/img/ObjetosLv1/Lampara.png" },
        { name: "Leon", letter: "L", image: "/img/ObjetosLv1/Leon.png" },
        { name: "Mariposa", letter: "M", image: "/img/ObjetosLv1/Mariposa.png" },
        { name: "Mesa", letter: "M", image: "/img/ObjetosLv1/Mesa.png" },
        { name: "Nido", letter: "N", image: "/img/ObjetosLv1/Nido.png" },
        { name: "Nube", letter: "N", image: "/img/ObjetosLv1/Nube.png" },
        { name: "Ñandu", letter: "Ñ", image: "/img/ObjetosLv1/Ñandu.png" },
        { name: "Olla", letter: "O", image: "/img/ObjetosLv1/Olla.png" },
        { name: "Oso", letter: "O", image: "/img/ObjetosLv1/Oso.png" },
        { name: "Pelota", letter: "P", image: "/img/ObjetosLv1/Pelota.png" },
        { name: "Pinguino", letter: "P", image: "/img/ObjetosLv1/Pinguino.png" },
        { name: "Queso", letter: "Q", image: "/img/ObjetosLv1/Queso.png" },
        { name: "Raton", letter: "R", image: "/img/ObjetosLv1/Raton.png" },
        { name: "Reloj", letter: "R", image: "/img/ObjetosLv1/Reloj.png" },
        { name: "Silla", letter: "S", image: "/img/ObjetosLv1/Silla.png" },
        { name: "Sol", letter: "S", image: "/img/ObjetosLv1/Sol.png" },
        { name: "Taza", letter: "T", image: "/img/ObjetosLv1/Taza.png" },
        { name: "Toro", letter: "T", image: "/img/ObjetosLv1/Toro.png" },
        { name: "Uvas", letter: "U", image: "/img/ObjetosLv1/Uvas.png" },
        { name: "Vaca", letter: "V", image: "/img/ObjetosLv1/Vaca.png" },
        { name: "Vaso", letter: "V", image: "/img/ObjetosLv1/Vaso.png" },
        { name: "Waffle", letter: "W", image: "/img/ObjetosLv1/Waffle.png" },
        { name: "Wifi", letter: "W", image: "/img/ObjetosLv1/Wifi.png" },
        { name: "Xilofono", letter: "X", image: "/img/ObjetosLv1/Xilofono.png" },
        { name: "Yate", letter: "Y", image: "/img/ObjetosLv1/Yate.png" },
        { name: "Yoyo", letter: "Y", image: "/img/ObjetosLv1/Yoyo.png" },
        { name: "Zanahoria", letter: "Z", image: "/img/ObjetosLv1/Zanahoria.png" },
        { name: "Zapato", letter: "Z", image: "/img/ObjetosLv1/Zapato.png" },
    ];


    useEffect(() => {
        const selectedObjects = [...objectList].sort(() => 0.5 - Math.random()).slice(0, 20);
        const rounds = [];
        for (let i = 0; i < 4; i++) {
            rounds.push(selectedObjects.slice(i * 5, i * 5 + 5));
        }
        setRoundObjects(rounds);
        setLetterOptions(generateLetterOptions(rounds[0][0]));
    }, []);

    const handleDragStart = (event, letter) => {
        setDraggedLetter(letter);
    };

    const handleDrop = async (event) => {
        event.preventDefault();
        setDroppedLetter(draggedLetter);
        setShowFeedback(true);
        if (draggedLetter === roundObjects[currentRound][currentObjectIndex].letter) {
            setCorrectAnswer(true);
            correctSound.play();
            setScore(prevScore => prevScore + 10);
            setTimeout(async () => {
                setShowFeedback(false);
                setDroppedLetter('');
                if (currentObjectIndex === 4) {
                    if (currentRound === 3) {
                        setShowFinalScreen(true);
                        finalSound.play();
                        // Guardar puntuación al finalizar la actividad
                        const codigoAcceso = localStorage.getItem('studentCodigoAcceso');
                        await guardarPuntuacion(codigoAcceso, 1, score + 10); // Asumiendo que es Level1
                    } else {
                        setCurrentRound(currentRound + 1);
                        setCurrentObjectIndex(0);
                        setLetterOptions(generateLetterOptions(roundObjects[currentRound + 1][0]));
                    }
                } else {
                    setCurrentObjectIndex(currentObjectIndex + 1);
                    setLetterOptions(generateLetterOptions(roundObjects[currentRound][currentObjectIndex + 1]));
                }
            }, 1000);
        } else {
            setCorrectAnswer(false);
            incorrectSound.play();
            setScore(prevScore => Math.max(prevScore - 1, 0)); // Restar 1 punto por respuesta incorrecta
            setTimeout(() => {
                setShowFeedback(false);
                setDroppedLetter('');
            }, 1000);
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
        const selectedObjects = objectList.sort(() => 0.5 - Math.random()).slice(0, 20);
        const rounds = [];
        for (let i = 0; i < 4; i++) {
            rounds.push(selectedObjects.slice(i * 5, i * 5 + 5));
        }
        setRoundObjects(rounds);
        setCurrentRound(0);
        setCurrentObjectIndex(0);
        setLetterOptions(generateLetterOptions(rounds[0][0]));
        setShowFinalScreen(false);
        setScore(0);
        setShowFeedback(false);
    };

    const goToHome = () => {
        mostrarActividad(false);
    };

    const nextActivity = () => {
        onNextActivity();
    };

    return (
        <section className='PlayScena'>
            {showFinalScreen ? (
                <FinalScreen score={score} onRestart={restartActivity} onGoToHome={goToHome} onNext={nextActivity} />
            ) : (
                <div className="actividad-lv1">
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${(currentObjectIndex + 1) / 5 * 100}%` }}></div>
                    </div>
                    <h2>¡Arrastra la Letra!</h2>
                    <div className="score">Puntuación: {score}</div>
                    {roundObjects[currentRound] && roundObjects[currentRound][currentObjectIndex] ? (
                        <>
                            <div className="object-image">
                                <img src={roundObjects[currentRound][currentObjectIndex].image} alt={roundObjects[currentRound][currentObjectIndex].name} className='imagen' />
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
                        </>
                    ) : (
                        <div>Cargando...</div>
                    )}
                </div>
            )}
        </section>
    );
}

export default ActividadLv1;
