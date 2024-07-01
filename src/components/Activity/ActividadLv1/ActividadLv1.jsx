import React, { useState, useEffect } from 'react';
import './ActividadLv1.css';
import FinalScreen from '../Final.jsx';
import guardarPuntuacion from '../../../helpers/guardarPuntuacion'; // Importar la función de guardar puntuación
import AudioPlayer from '../../../helpers/AudioPlayer'; 


const ActividadLv1 = ({ mostrarActividad, onNextActivity }) => {
    const [audioKey, setAudioKey] = useState('ActividadLv1'); // Estado para el audio actual
    const [clickedLetter, setClickedLetter] = useState('');
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
        { name: "Abeja", letter: "A", image: "/img/ObjetosLv1/Abeja.png", audio: "abeja" },
        { name: "Avion", letter: "A", image: "/img/ObjetosLv1/Avion.png", audio: "avion" },
        { name: "Bicicleta", letter: "B", image: "/img/ObjetosLv1/Bicicleta.png", audio: "bicicleta" },
        { name: "Botas", letter: "B", image: "/img/ObjetosLv1/Botas.png", audio: "botas" },
        { name: "Carro", letter: "C", image: "/img/ObjetosLv1/Carro.png", audio: "carro" },
        { name: "Casa", letter: "C", image: "/img/ObjetosLv1/Casa.png", audio: "casa" },
        { name: "Delfin", letter: "D", image: "/img/ObjetosLv1/Delfin.png", audio: "delfin" },
        { name: "Dinosaurio", letter: "D", image: "/img/ObjetosLv1/Dinosaurio.png", audio: "dinosaurio" },
        { name: "Elefante", letter: "E", image: "/img/ObjetosLv1/Elefante.png", audio: "elefante" },
        { name: "Erizo", letter: "E", image: "/img/ObjetosLv1/Erizo.png", audio: "erizo" },
        { name: "Flauta", letter: "F", image: "/img/ObjetosLv1/Flauta.png", audio: "flauta" },
        { name: "Flores", letter: "F", image: "/img/ObjetosLv1/Flores.png", audio: "flores" },
        { name: "Gato", letter: "G", image: "/img/ObjetosLv1/Gato.png", audio: "gato" },
        { name: "Guayaba", letter: "G", image: "/img/ObjetosLv1/Guayaba.png", audio: "guayaba" },
        { name: "Hielo", letter: "H", image: "/img/ObjetosLv1/Hielo.png", audio: "hielo" },
        { name: "Hormiga", letter: "H", image: "/img/ObjetosLv1/Hormiga.png", audio: "hormiga" },
        { name: "Iguana", letter: "I", image: "/img/ObjetosLv1/Iguana.png", audio: "iguana" },
        { name: "Iman", letter: "I", image: "/img/ObjetosLv1/Iman.png", audio: "iman" },
        { name: "Jabon", letter: "J", image: "/img/ObjetosLv1/Jabon.png", audio: "jabon" },
        { name: "Jirafa", letter: "J", image: "/img/ObjetosLv1/Jirafa.png", audio: "jirafa" },
        { name: "Karate", letter: "K", image: "/img/ObjetosLv1/Karate.png", audio: "karate" },
        { name: "Koala", letter: "K", image: "/img/ObjetosLv1/Koala.png", audio: "koala" },
        { name: "Lampara", letter: "L", image: "/img/ObjetosLv1/Lampara.png", audio: "lampara" },
        { name: "Leon", letter: "L", image: "/img/ObjetosLv1/Leon.png", audio: "leon" },
        { name: "Mariposa", letter: "M", image: "/img/ObjetosLv1/Mariposa.png", audio: "mariposa" },
        { name: "Mesa", letter: "M", image: "/img/ObjetosLv1/Mesa.png", audio: "mesa" },
        { name: "Nido", letter: "N", image: "/img/ObjetosLv1/Nido.png", audio: "nido" },
        { name: "Nube", letter: "N", image: "/img/ObjetosLv1/Nube.png", audio: "nube" },
        { name: "Ñandu", letter: "Ñ", image: "/img/ObjetosLv1/Ñandu.png", audio: "ñandu" },
        { name: "Olla", letter: "O", image: "/img/ObjetosLv1/Olla.png", audio: "olla" },
        { name: "Oso", letter: "O", image: "/img/ObjetosLv1/Oso.png", audio: "oso" },
        { name: "Pelota", letter: "P", image: "/img/ObjetosLv1/Pelota.png", audio: "pelota" },
        { name: "Pinguino", letter: "P", image: "/img/ObjetosLv1/Pinguino.png", audio: "pinguino" },
        { name: "Queso", letter: "Q", image: "/img/ObjetosLv1/Queso.png", audio: "queso" },
        { name: "Raton", letter: "R", image: "/img/ObjetosLv1/Raton.png", audio: "raton" },
        { name: "Reloj", letter: "R", image: "/img/ObjetosLv1/Reloj.png", audio: "reloj" },
        { name: "Silla", letter: "S", image: "/img/ObjetosLv1/Silla.png", audio: "silla" },
        { name: "Sol", letter: "S", image: "/img/ObjetosLv1/Sol.png", audio: "sol" },
        { name: "Taza", letter: "T", image: "/img/ObjetosLv1/Taza.png", audio: "taza" },
        { name: "Toro", letter: "T", image: "/img/ObjetosLv1/Toro.png", audio: "toro" },
        { name: "Uvas", letter: "U", image: "/img/ObjetosLv1/Uvas.png", audio: "uvas" },
        { name: "Vaca", letter: "V", image: "/img/ObjetosLv1/Vaca.png", audio: "vaca" },
        { name: "Vaso", letter: "V", image: "/img/ObjetosLv1/Vaso.png", audio: "vaso" },
        { name: "Waffle", letter: "W", image: "/img/ObjetosLv1/Waffle.png", audio: "waffle" },
        { name: "Wifi", letter: "W", image: "/img/ObjetosLv1/Wifi.png", audio: "wifi" },
        { name: "Xilofono", letter: "X", image: "/img/ObjetosLv1/Xilofono.png", audio: "xilofono" },
        { name: "Yate", letter: "Y", image: "/img/ObjetosLv1/Yate.png", audio: "yate" },
        { name: "Yoyo", letter: "Y", image: "/img/ObjetosLv1/Yoyo.png", audio: "yoyo" },
        { name: "Zanahoria", letter: "Z", image: "/img/ObjetosLv1/Zanahoria.png", audio: "zanahoria" },
        { name: "Zapato", letter: "Z", image: "/img/ObjetosLv1/Zapato.png", audio: "zapato" },
    ];
    

    useEffect(() => {
        // Reproducir audio de instrucciones después del audio de bienvenida
        if (audioKey === 'ActividadLv1') {
            const timer = setTimeout(() => {
                setAudioKey('InstruccionLv1');
            }, 6000); // Ajusta el tiempo según la duración del audio de bienvenida
            return () => clearTimeout(timer);
        }
     
    }, [audioKey]);

    useEffect(() => {
        const selectedObjects = [...objectList].sort(() => 0.5 - Math.random()).slice(0, 20);
        const rounds = [];
        for (let i = 0; i < 4; i++) {
            rounds.push(selectedObjects.slice(i * 5, i * 5 + 5));
        }
        setRoundObjects(rounds);
        setLetterOptions(generateLetterOptions(rounds[0][0]));
    }, []);

    const handleClickObjeto = (audio) => {
        setAudioKey(audio); // Reproducir audio del objeto seleccionado
    };

    const handleLetterClick = async (letter) => {
        setClickedLetter(letter);
        setDroppedLetter(letter);
        setShowFeedback(true);
       
        // Reproducir el audio de la letra seleccionada
        setAudioKey(`letra${letter}`);

        if (letter === roundObjects[currentRound][currentObjectIndex].letter) {
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
                        const codigoAcceso = localStorage.getItem('codigoAcceso'); // Ajusta aquí según cómo almacenes el código de acceso
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
                    <AudioPlayer audioKey={audioKey} /> 
                    <div className="progress-bar">
                        <div className="progress" style={{ width: `${(currentObjectIndex + 1) / 5 * 100}%` }}></div>
                    </div>
                    <h2>¡Selecciona la Letra!</h2>
                    <div className="score">Puntuación: {score}</div>
                    {roundObjects[currentRound] && roundObjects[currentRound][currentObjectIndex] ? (
                        <>
                            <div className="object-image">
                                <img onClick={() => handleClickObjeto(roundObjects[currentRound][currentObjectIndex].audio)} src={roundObjects[currentRound][currentObjectIndex].image} alt={roundObjects[currentRound][currentObjectIndex].name} className='imagen' />
                            </div>
                            <div className={`drop-area ${correctAnswer ? 'correct' : ''}`}>
                                {droppedLetter}
                            </div>
                            {showFeedback && <div className="feedback-message">{correctAnswer ? '¡Bravo!' : 'Intenta de nuevo'}</div>}
                            <div className="letters-container">
                                {letterOptions.map((letter, index) => (
                                    <div key={index} className="letter" onClick={() => handleLetterClick(letter)}>{letter}</div>
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
