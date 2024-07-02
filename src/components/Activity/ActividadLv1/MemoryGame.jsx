import React, { useState, useEffect } from 'react';
import './ActividadLv1.css';
import FinalScreen from '../Final'; // Importar el componente FinalScreen
import guardarPuntuacion from '../../../helpers/guardarPuntuacion.jsx';
import AudioPlayer from '../../../helpers/AudioPlayer'; 

const correctSound = new Audio('/sounds/correct-6033.mp3');
const incorrectSound = new Audio('/sounds/wronganswer-37702.mp3');
const finalSound = new Audio('/sounds/level-win-6416.mp3');
const positiveFeedbackSound = new Audio('/sounds/bien.mp3');
const AyudaFeedbackSound = new Audio('/sounds/intenta.mp3');

const MemoryGame = ({ onNext }) => {
    const [audioKey, setAudioKey] = useState('Memorias'); // Estado para el audio actual
    const [cartas, setCartas] = useState([]);
    const [cartasVolteadas, setCartasVolteadas] = useState([]);
    const [cartasCoincidentes, setCartasCoincidentes] = useState([]);
    const [movimientos, setMovimientos] = useState(0);
    const [rondas, setRondas] = useState(1);
    const [finJuego, setFinJuego] = useState(false);
    const [puntuacion, setPuntuacion] = useState(0);
    const maxRondas = 3;
   

    

    const datosCartas = [
        { id: 1, tipo: 'objeto', nombre: 'Abeja', imagen: '/img/ObjetosLv1/Abeja.png' },
        { id: 2, tipo: 'objeto', nombre: 'Avión', imagen: '/img/ObjetosLv1/Avion.png' },
        { id: 3, tipo: 'objeto', nombre: 'Bicicleta', imagen: '/img/ObjetosLv1/Bicicleta.png' },
        { id: 4, tipo: 'objeto', nombre: 'Botas', imagen: '/img/ObjetosLv1/Botas.png' },
        { id: 5, tipo: 'objeto', nombre: 'Carro', imagen: '/img/ObjetosLv1/Carro.png' },
        { id: 6, tipo: 'objeto', nombre: 'Casa', imagen: '/img/ObjetosLv1/Casa.png' },
        { id: 7, tipo: 'objeto', nombre: 'Delfín', imagen: '/img/ObjetosLv1/Delfin.png' },
        { id: 8, tipo: 'objeto', nombre: 'Dinosaurio', imagen: '/img/ObjetosLv1/Dinosaurio.png' },
        { id: 9, tipo: 'objeto', nombre: 'Elefante', imagen: '/img/ObjetosLv1/Elefante.png' },
        { id: 10, tipo: 'objeto', nombre: 'Erizo', imagen: '/img/ObjetosLv1/Erizo.png' },
        { id: 11, tipo: 'objeto', nombre: 'Flauta', imagen: '/img/ObjetosLv1/Flauta.png' },
        { id: 12, tipo: 'objeto', nombre: 'Flores', imagen: '/img/ObjetosLv1/Flores.png' },
        { id: 13, tipo: 'objeto', nombre: 'Gato', imagen: '/img/ObjetosLv1/Gato.png' },
        { id: 14, tipo: 'objeto', nombre: 'Guayaba', imagen: '/img/ObjetosLv1/Guayaba.png' },
        { id: 15, tipo: 'objeto', nombre: 'Hielo', imagen: '/img/ObjetosLv1/Hielo.png' },
        { id: 16, tipo: 'objeto', nombre: 'Hormiga', imagen: '/img/ObjetosLv1/Hormiga.png' },
        { id: 17, tipo: 'objeto', nombre: 'Iguana', imagen: '/img/ObjetosLv1/Iguana.png' },
        { id: 18, tipo: 'objeto', nombre: 'Imán', imagen: '/img/ObjetosLv1/Iman.png' },
        { id: 19, tipo: 'objeto', nombre: 'Jabón', imagen: '/img/ObjetosLv1/Jabon.png' },
        { id: 20, tipo: 'objeto', nombre: 'Jirafa', imagen: '/img/ObjetosLv1/Jirafa.png' },
        { id: 21, tipo: 'objeto', nombre: 'Karate', imagen: '/img/ObjetosLv1/Karate.png' },
        { id: 22, tipo: 'objeto', nombre: 'Koala', imagen: '/img/ObjetosLv1/Koala.png' },
        { id: 23, tipo: 'objeto', nombre: 'Lámpara', imagen: '/img/ObjetosLv1/Lampara.png' },
        { id: 24, tipo: 'objeto', nombre: 'León', imagen: '/img/ObjetosLv1/Leon.png' },
        { id: 25, tipo: 'objeto', nombre: 'Mariposa', imagen: '/img/ObjetosLv1/Mariposa.png' },
        { id: 26, tipo: 'objeto', nombre: 'Mesa', imagen: '/img/ObjetosLv1/Mesa.png' },
        { id: 27, tipo: 'objeto', nombre: 'Nido', imagen: '/img/ObjetosLv1/Nido.png' },
        { id: 28, tipo: 'objeto', nombre: 'Nube', imagen: '/img/ObjetosLv1/Nube.png' },
        { id: 29, tipo: 'objeto', nombre: 'Ñandú', imagen: '/img/ObjetosLv1/Ñandu.png' },
        { id: 30, tipo: 'objeto', nombre: 'Olla', imagen: '/img/ObjetosLv1/Olla.png' },
        { id: 31, tipo: 'objeto', nombre: 'Oso', imagen: '/img/ObjetosLv1/Oso.png' },
        { id: 32, tipo: 'objeto', nombre: 'Pelota', imagen: '/img/ObjetosLv1/Pelota.png' },
        { id: 33, tipo: 'objeto', nombre: 'Pingüino', imagen: '/img/ObjetosLv1/Pinguino.png' },
        { id: 34, tipo: 'objeto', nombre: 'Queso', imagen: '/img/ObjetosLv1/Queso.png' },
        { id: 35, tipo: 'objeto', nombre: 'Ratón', imagen: '/img/ObjetosLv1/Raton.png' },
        { id: 36, tipo: 'objeto', nombre: 'Reloj', imagen: '/img/ObjetosLv1/Reloj.png' },
        { id: 37, tipo: 'objeto', nombre: 'Silla', imagen: '/img/ObjetosLv1/Silla.png' },
        { id: 38, tipo: 'objeto', nombre: 'Sol', imagen: '/img/ObjetosLv1/Sol.png' },
        { id: 39, tipo: 'objeto', nombre: 'Taza', imagen: '/img/ObjetosLv1/Taza.png' },
        { id: 40, tipo: 'objeto', nombre: 'Toro', imagen: '/img/ObjetosLv1/Toro.png' },
        { id: 41, tipo: 'objeto', nombre: 'Uvas', imagen: '/img/ObjetosLv1/Uvas.png' },
        { id: 42, tipo: 'objeto', nombre: 'Vaca', imagen: '/img/ObjetosLv1/Vaca.png' },
        { id: 43, tipo: 'objeto', nombre: 'Vaso', imagen: '/img/ObjetosLv1/Vaso.png' },
        { id: 44, tipo: 'objeto', nombre: 'Waffle', imagen: '/img/ObjetosLv1/Waffle.png' },
        { id: 45, tipo: 'objeto', nombre: 'Wifi', imagen: '/img/ObjetosLv1/Wifi.png' },
        { id: 46, tipo: 'objeto', nombre: 'Xilófono', imagen: '/img/ObjetosLv1/Xilofono.png' },
        { id: 47, tipo: 'objeto', nombre: 'Yate', imagen: '/img/ObjetosLv1/Yate.png' },
        { id: 48, tipo: 'objeto', nombre: 'Yoyo', imagen: '/img/ObjetosLv1/Yoyo.png' },
        { id: 49, tipo: 'objeto', nombre: 'Zanahoria', imagen: '/img/ObjetosLv1/Zanahoria.png' },
        { id: 50, tipo: 'objeto', nombre: 'Zapato', imagen: '/img/ObjetosLv1/Zapato.png' },
        { id: 51, tipo: 'letra', letra: 'A', imagen: '/img/Letras/A.png' },
        { id: 52, tipo: 'letra', letra: 'B', imagen: '/img/Letras/B.png' },
        { id: 53, tipo: 'letra', letra: 'C', imagen: '/img/Letras/C.png' },
        { id: 54, tipo: 'letra', letra: 'D', imagen: '/img/Letras/D.png' },
        { id: 55, tipo: 'letra', letra: 'E', imagen: '/img/Letras/E.png' },
        { id: 56, tipo: 'letra', letra: 'F', imagen: '/img/Letras/F.png' },
        { id: 57, tipo: 'letra', letra: 'G', imagen: '/img/Letras/G.png' },
        { id: 58, tipo: 'letra', letra: 'H', imagen: '/img/Letras/H.png' },
        { id: 59, tipo: 'letra', letra: 'I', imagen: '/img/Letras/I.png' },
        { id: 60, tipo: 'letra', letra: 'J', imagen: '/img/Letras/J.png' },
        { id: 61, tipo: 'letra', letra: 'K', imagen: '/img/Letras/K.png' },
        { id: 62, tipo: 'letra', letra: 'L', imagen: '/img/Letras/L.png' },
        { id: 63, tipo: 'letra', letra: 'M', imagen: '/img/Letras/M.png' },
        { id: 64, tipo: 'letra', letra: 'N', imagen: '/img/Letras/N.png' },
        { id: 65, tipo: 'letra', letra: 'Ñ', imagen: '/img/Letras/Ñ.png' },
        { id: 66, tipo: 'letra', letra: 'O', imagen: '/img/Letras/O.png' },
        { id: 67, tipo: 'letra', letra: 'P', imagen: '/img/Letras/P.png' },
        { id: 68, tipo: 'letra', letra: 'Q', imagen: '/img/Letras/Q.png' },
        { id: 69, tipo: 'letra', letra: 'R', imagen: '/img/Letras/R.png' },
        { id: 70, tipo: 'letra', letra: 'S', imagen: '/img/Letras/S.png' },
        { id: 71, tipo: 'letra', letra: 'T', imagen: '/img/Letras/T.png' },
        { id: 72, tipo: 'letra', letra: 'U', imagen: '/img/Letras/U.png' },
        { id: 73, tipo: 'letra', letra: 'V', imagen: '/img/Letras/V.png' },
        { id: 74, tipo: 'letra', letra: 'W', imagen: '/img/Letras/W.png' },
        { id: 75, tipo: 'letra', letra: 'X', imagen: '/img/Letras/X.png' },
        { id: 76, tipo: 'letra', letra: 'Y', imagen: '/img/Letras/Y.png' },
        { id: 77, tipo: 'letra', letra: 'Z', imagen: '/img/Letras/Z.png' },
    ];

    useEffect(() => {
        // Reproducir audio de instrucciones después del audio de bienvenida
        if (audioKey === 'Memorias') {
            const timer = setTimeout(() => {
                setAudioKey('InstruccionMemorias');
            }, 3000); // Ajusta el tiempo según la duración del audio de bienvenida
            return () => clearTimeout(timer);
        }
        if (audioKey === 'InstruccionMemorias') {
            const timer = setTimeout(() => {
                setAudioKey('EjemploMemoria');
            }, 7000); // Ajusta el tiempo según la duración del audio de bienvenida
            return () => clearTimeout(timer);
        }
    }, [audioKey]);

    // Función para obtener cartas aleatorias
    const obtenerCartasAleatorias = (numCartas) => {
        const numLetras = numCartas / 2;
        const letras = datosCartas.filter(carta => carta.tipo === 'letra');
        const letrasSeleccionadas = [];
        while (letrasSeleccionadas.length < numLetras) {
            const letraAleatoria = letras[Math.floor(Math.random() * letras.length)];
            if (!letrasSeleccionadas.includes(letraAleatoria)) {
                letrasSeleccionadas.push(letraAleatoria);
            }
        }
        const objetos = datosCartas.filter(carta => carta.tipo === 'objeto');
        const objetosSeleccionados = letrasSeleccionadas.map(letra => {
            const posiblesObjetos = objetos.filter(objeto => objeto.nombre[0].toUpperCase() === letra.letra);
            return posiblesObjetos[Math.floor(Math.random() * posiblesObjetos.length)];
        });
        const cartasSeleccionadas = [...letrasSeleccionadas, ...objetosSeleccionados];
        return cartasSeleccionadas.sort(() => Math.random() - 0.5);
    };

    // Función para manejar el clic en las cartas
    const manejarClicCarta = (carta) => {
        if (cartasVolteadas.length === 2 || cartasCoincidentes.includes(carta)) return;
        const nuevasCartasVolteadas = [...cartasVolteadas, carta];
        setCartasVolteadas(nuevasCartasVolteadas);

        if (cartasVolteadas.length === 1) {
            setMovimientos(movimientos + 1);
            const [primeraCarta] = cartasVolteadas;

            if (
                (primeraCarta.tipo === 'objeto' && carta.tipo === 'letra' && carta.letra === primeraCarta.nombre[0]) ||
                (primeraCarta.tipo === 'letra' && carta.tipo === 'objeto' && primeraCarta.letra === carta.nombre[0])
            ) {
                setCartasCoincidentes([...cartasCoincidentes, primeraCarta, carta]);
                setPuntuacion(puntuacion + 10); // Añadir puntos
                correctSound.play(); // Reproducir sonido de acierto
                positiveFeedbackSound.play()
                setCartasVolteadas([]);
            } else {
                setTimeout(() => {
                    setCartasVolteadas([]);
                    incorrectSound.play(); // Reproducir sonido de error
                    AyudaFeedbackSound.play();
                }, 1000);
            }
        }
    };

    // Función para iniciar una nueva ronda
    const iniciarNuevaRonda = () => {
        const numCartasPorRonda = [8, 12, 16];
        if (rondas < maxRondas) {
            const numCartas = numCartasPorRonda[rondas];
            setRondas(rondas + 1);
            setCartas(obtenerCartasAleatorias(numCartas));
            setCartasVolteadas([]);
            setCartasCoincidentes([]);
            setMovimientos(0);
            setPuntuacion(puntuacion); // Mantener la puntuación acumulada
        } else {
            setFinJuego(true);
        }
    };

    // Efecto para verificar si se completó la partida
    useEffect(() => {
        if (cartasCoincidentes.length === cartas.length && cartas.length > 0) {
            if (rondas < maxRondas) {
                setTimeout(() => {
                    iniciarNuevaRonda();
                }, 1000);
            } else {
                setFinJuego(true);
                finalSound.play(); // Reproducir sonido de finalización del juego
                const codigoAcceso = localStorage.getItem('studentCodigoAcceso');
                guardarPuntuacion(codigoAcceso, 1, puntuacion); // Guarda la puntuación en Firestore
            }
        }
    }, [cartasCoincidentes]);

    // Efecto para iniciar el juego con 8 cartas al cargar el componente
    useEffect(() => {
        setCartas(obtenerCartasAleatorias(8)); // Iniciar con 8 cartas
    }, []);

    // Mostrar la pantalla final si se completó el juego
    if (finJuego) {
        return (
            <FinalScreen
                score={puntuacion}
                onRestart={() => {
                    setCartas([]);
                    setCartasVolteadas([]);
                    setCartasCoincidentes([]);
                    setMovimientos(0);
                    setRondas(1);
                    setFinJuego(false);
                    setPuntuacion(0);
                    setCartas(obtenerCartasAleatorias(8));
                }}
                onGoToHome={() => console.log("Ir al inicio")} // Definir acción para ir al inicio
                onNext={onNext}
            />
        );
    }

    // Renderizar el juego de memoria mientras se esté jugando
    return (
        <div className="memory-game">
            <AudioPlayer audioKey={audioKey} /> 
            <h2>Juego de Memoria</h2>
            <div className="movimientos">Movimientos: {movimientos}</div>
            <div className="rondas">Ronda: {rondas}/{maxRondas}</div>
            <div className="puntuacion">Puntuación: {puntuacion}</div>
            <div className="contenedor-cartas">
                {cartas.map((carta, index) => (
                    <div
                        key={index}
                        className={`carta ${cartasVolteadas.includes(carta) || cartasCoincidentes.includes(carta) ? 'volteada' : 'boca-abajo'}`}
                        onClick={() => manejarClicCarta(carta)}
                    >
                        <img
                            src={cartasVolteadas.includes(carta) || cartasCoincidentes.includes(carta) ? carta.imagen : ''}
                            alt={`Carta ${carta.tipo === 'objeto' ? carta.nombre : carta.letra}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemoryGame;
