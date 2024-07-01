import React, { useState, useEffect } from 'react';
import './Palabras.css';
import FinalScreen from '../Final';
import AudioPlayer from '../../../helpers/AudioPlayer'; 


const palabrasData = {
  facil: [
    { id: 1, nombre: 'Sol', silabas: ['Sol'], imagen: '/img/ObjetosLv1/Sol.png' },
    { id: 2, nombre: 'Carro', silabas: ['Ca', 'rro'], imagen: '/img/ObjetosLv1/Carro.png' },
    { id: 3, nombre: 'Mesa', silabas: ['Me', 'sa'], imagen: '/img/ObjetosLv1/Mesa.png' },
    { id: 4, nombre: 'Botas', silabas: ['Bo', 'tas'], imagen: '/img/ObjetosLv1/Botas.png' },
    { id: 5, nombre: 'Casa', silabas: ['Ca', 'sa'], imagen: '/img/ObjetosLv1/Casa.png' },
    { id: 6, nombre: 'Delfin', silabas: ['Del', 'fin'], imagen: '/img/ObjetosLv1/Delfin.png' },
    { id: 7, nombre: 'Gato', silabas: ['Ga', 'to'], imagen: '/img/ObjetosLv1/Gato.png' },
    { id: 8, nombre: 'Hielo', silabas: ['Hie', 'lo'], imagen: '/img/ObjetosLv1/Hielo.png' },
    { id: 9, nombre: 'Lampara', silabas: ['Lam', 'pa', 'ra'], imagen: '/img/ObjetosLv1/Lampara.png' },
    { id: 10, nombre: 'Nido', silabas: ['Ni', 'do'], imagen: '/img/ObjetosLv1/Nido.png' },
    { id: 11, nombre: 'Oso', silabas: ['O', 'so'], imagen: '/img/ObjetosLv1/Oso.png' },
    { id: 12, nombre: 'Silla', silabas: ['Si', 'lla'], imagen: '/img/ObjetosLv1/Silla.png' },
  ],
  medio: [
    { id: 13, nombre: 'Pelota', silabas: ['Pe', 'lo', 'ta'], imagen: '/img/ObjetosLv1/Pelota.png' },
    { id: 14, nombre: 'Avion', silabas: ['A', 'vion'], imagen: '/img/ObjetosLv1/Avion.png' },
    { id: 15, nombre: 'Bicicleta', silabas: ['Bi', 'ci', 'cle', 'ta'], imagen: '/img/ObjetosLv1/Bicicleta.png' },
    { id: 16, nombre: 'Elefante', silabas: ['E', 'le', 'fan', 'te'], imagen: '/img/ObjetosLv1/Elefante.png' },
    { id: 17, nombre: 'Flauta', silabas: ['Flau', 'ta'], imagen: '/img/ObjetosLv1/Flauta.png' },
    { id: 18, nombre: 'Flores', silabas: ['Flo', 'res'], imagen: '/img/ObjetosLv1/Flores.png' },
    { id: 19, nombre: 'Guayaba', silabas: ['Gua', 'ya', 'ba'], imagen: '/img/ObjetosLv1/Guayaba.png' },
    { id: 20, nombre: 'Hormiga', silabas: ['Hor', 'mi', 'ga'], imagen: '/img/ObjetosLv1/Hormiga.png' },
    { id: 21, nombre: 'Iman', silabas: ['I', 'man'], imagen: '/img/ObjetosLv1/Iman.png' },
    { id: 22, nombre: 'Jabon', silabas: ['Ja', 'bon'], imagen: '/img/ObjetosLv1/Jabon.png' },
    { id: 23, nombre: 'Jirafa', silabas: ['Ji', 'ra', 'fa'], imagen: '/img/ObjetosLv1/Jirafa.png' },
    { id: 24, nombre: 'Karate', silabas: ['Ka', 'ra', 'te'], imagen: '/img/ObjetosLv1/Karate.png' },
    { id: 25, nombre: 'Koala', silabas: ['Ko', 'a', 'la'], imagen: '/img/ObjetosLv1/Koala.png' },
    { id: 26, nombre: 'Leon', silabas: ['Le', 'on'], imagen: '/img/ObjetosLv1/Leon.png' },
    { id: 27, nombre: 'Nube', silabas: ['Nu', 'be'], imagen: '/img/ObjetosLv1/Nube.png' },
    { id: 28, nombre: 'Ñandu', silabas: ['Ñan', 'du'], imagen: '/img/ObjetosLv1/Ñandu.png' },
    { id: 29, nombre: 'Olla', silabas: ['O', 'lla'], imagen: '/img/ObjetosLv1/Olla.png' },
    { id: 30, nombre: 'Pinguino', silabas: ['Pin', 'gui', 'no'], imagen: '/img/ObjetosLv1/Pinguino.png' },
    { id: 31, nombre: 'Queso', silabas: ['Que', 'so'], imagen: '/img/ObjetosLv1/Queso.png' },
    { id: 32, nombre: 'Raton', silabas: ['Ra', 'ton'], imagen: '/img/ObjetosLv1/Raton.png' },
    { id: 33, nombre: 'Reloj', silabas: ['Re', 'loj'], imagen: '/img/ObjetosLv1/Reloj.png' },
    { id: 34, nombre: 'Taza', silabas: ['Ta', 'za'], imagen: '/img/ObjetosLv1/Taza.png' },
    { id: 35, nombre: 'Toro', silabas: ['To', 'ro'], imagen: '/img/ObjetosLv1/Toro.png' },
    { id: 36, nombre: 'Uvas', silabas: ['U', 'vas'], imagen: '/img/ObjetosLv1/Uvas.png' },
    { id: 37, nombre: 'Vaca', silabas: ['Va', 'ca'], imagen: '/img/ObjetosLv1/Vaca.png' },
    { id: 38, nombre: 'Vaso', silabas: ['Va', 'so'], imagen: '/img/ObjetosLv1/Vaso.png' },
    { id: 39, nombre: 'Waffle', silabas: ['Wa', 'ffle'], imagen: '/img/ObjetosLv1/Waffle.png' },
    { id: 40, nombre: 'Wifi', silabas: ['Wi', 'fi'], imagen: '/img/ObjetosLv1/Wifi.png' },
    { id: 41, nombre: 'Yate', silabas: ['Ya', 'te'], imagen: '/img/ObjetosLv1/Yate.png' },
    { id: 42, nombre: 'Yoyo', silabas: ['Yo', 'yo'], imagen: '/img/ObjetosLv1/Yoyo.png' },
  ],
  dificil: [
    { id: 43, nombre: 'Dinosaurio', silabas: ['Di', 'no', 'sau', 'rio'], imagen: '/img/ObjetosLv1/Dinosaurio.png' },
    { id: 44, nombre: 'Mariposa', silabas: ['Ma', 'ri', 'po', 'sa'], imagen: '/img/ObjetosLv1/Mariposa.png' },
    { id: 45, nombre: 'Erizo', silabas: ['E', 'ri', 'zo'], imagen: '/img/ObjetosLv1/Erizo.png' },
    { id: 46, nombre: 'Iguana', silabas: ['I', 'gua', 'na'], imagen: '/img/ObjetosLv1/Iguana.png' },
    { id: 47, nombre: 'Zapato', silabas: ['Za', 'pa', 'to'], imagen: '/img/ObjetosLv1/Zapato.png' },
    { id: 48, nombre: 'Zanahoria', silabas: ['Za', 'na', 'ho', 'ria'], imagen: '/img/ObjetosLv1/Zanahoria.png' },
    { id: 49, nombre: 'Xilofono', silabas: ['Xi', 'lo', 'fo', 'no'], imagen: '/img/ObjetosLv1/Xilofono.png' },
    { id: 50, nombre: 'Abeja', silabas: ['A', 'be', 'ja'], imagen: '/img/ObjetosLv1/Abeja.png' },
  ],
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomWord = (difficulty) => {
  const words = palabrasData[difficulty];
  return words[Math.floor(Math.random() * words.length)];
};

const Palabras = () => {
  const [audioKey, setAudioKey] = useState('Misterio'); // Estado para el audio actual
  const [currentRound, setCurrentRound] = useState(0);
  const [currentWord, setCurrentWord] = useState(null);
  const [shuffledSilabas, setShuffledSilabas] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [isGameComplete, setIsGameComplete] = useState(false);
  const [revealImage, setRevealImage] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Reproducir audio de instrucciones después del audio de bienvenida
    if (audioKey === 'Misterio') {
        const timer = setTimeout(() => {
            setAudioKey('InstruccionMisterio');
        }, 2000); // Ajusta el tiempo según la duración del audio de bienvenida
        return () => clearTimeout(timer);
    }
 
}, [audioKey]);
  useEffect(() => {
    const difficultyLevels = ['facil', 'medio', 'dificil'];
    if (currentRound < difficultyLevels.length) {
      const selectedWord = getRandomWord(difficultyLevels[currentRound]);
      setCurrentWord(selectedWord);
      const silabas = selectedWord.silabas;
      setShuffledSilabas(shuffleArray([...silabas]));
      setUserInput(new Array(silabas.length).fill(''));
      setRevealImage(false);
    } else {
      setIsGameComplete(true);
    }
  }, [currentRound]);

  const handleSilabaClick = (index) => {
    const silaba = shuffledSilabas[index];
    const firstEmptyIndex = userInput.findIndex((input) => input === '');
    if (firstEmptyIndex !== -1) {
      const newInput = [...userInput];
      newInput[firstEmptyIndex] = silaba;
      setUserInput(newInput);
      const newShuffled = [...shuffledSilabas];
      newShuffled[index] = '';
      setShuffledSilabas(newShuffled);
    } else {
      const silabaIndex = userInput.indexOf(silaba);
      if (silabaIndex !== -1) {
        const newInput = [...userInput];
        newInput[silabaIndex] = '';
        setUserInput(newInput);
        const newShuffled = [...shuffledSilabas];
        newShuffled[index] = silaba;
        setShuffledSilabas(newShuffled);
      }
    }
  };

  const handleInputClick = (index) => {
    if (userInput[index] !== '') {
      const newShuffled = [...shuffledSilabas];
      const silaba = userInput[index];
      const firstEmptyShuffledIndex = newShuffled.findIndex((input) => input === '');
      if (firstEmptyShuffledIndex !== -1) {
        newShuffled[firstEmptyShuffledIndex] = silaba;
      } else {
        newShuffled.push(silaba);
      }
      setShuffledSilabas(newShuffled);
      const newInput = [...userInput];
      newInput[index] = '';
      setUserInput(newInput);
    }
  };

  const getSilabaClass = (silaba, index) => {
    if (silaba === '') return '';
    if (silaba.toLowerCase() === currentWord.silabas[index].toLowerCase()) {
      return 'correct';
    }
    if (currentWord.silabas.map(s => s.toLowerCase()).includes(silaba.toLowerCase())) {
      return 'misplaced';
    }
    return '';
  };

  useEffect(() => {
    checkWord();
  }, [userInput]);

  const checkWord = () => {
    if (currentWord && userInput.join('').toLowerCase() === currentWord.silabas.join('').toLowerCase()) {
      setRevealImage(true);
      setScore((prevScore) => prevScore + 50);
      if (currentRound < 2) {
        setTimeout(() => {
          setCurrentRound((prevRound) => prevRound + 1);
        }, 1000);
      } else {
        setTimeout(() => {
          setIsGameComplete(true);
        }, 1000);
      }
    }
  };

  const handleIncorrectSilaba = (index) => {
    setScore((prevScore) => prevScore - 10);
  };

  const restartGame = () => {
    setCurrentRound(0);
    setIsGameComplete(false);
    setCurrentWord(null);
    setShuffledSilabas([]);
    setUserInput([]);
    setRevealImage(false);
    setScore(0);
  };

  if (isGameComplete) {
    return <FinalScreen score={score} onRestart={restartGame} onGoToHome={() => {}} onNext={() => {}} />;
  }

  if (!currentWord) return null;

  return (
    <div className="Palabras">
      <AudioPlayer audioKey={audioKey} /> 
      <h2>Descubre la imagen secreta</h2>
      <div className="score">Puntuación: {score}</div>
      <div className="image-container">
        {revealImage ? (
          <img src={currentWord.imagen} alt={currentWord.nombre} className="revealed-image" />
        ) : (
          <div className="hidden-image">?</div>
        )}
      </div>
      <div className="letters-container">
        {shuffledSilabas.map((silaba, index) => (
          <div
            key={index}
            className={`letter ${silaba === '' ? 'used' : ''}`}
            onClick={() => handleSilabaClick(index)}
          >
            {silaba}
          </div>
        ))}
      </div>
      <div className="word-container">
        {userInput.map((silaba, index) => (
          <div
            key={index}
            className={`word-letter ${getSilabaClass(silaba, index)}`}
            onClick={() => {
              handleInputClick(index);
              if (getSilabaClass(silaba, index) === 'misplaced') {
                handleIncorrectSilaba(index);
              }
            }}
          >
            {silaba}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Palabras;
