import React, { useState, useEffect } from 'react';
import './Cartilla.css';
import AudioPlayer from '../../../helpers/AudioPlayer'; 
import instructionGif from '/Gif/cartilla.gif'; // Importa tu GIF


const datosCartas = [
    { letra: 'A', nombre: 'Abeja', imagen: '/img/ObjetosLv1/Abeja.png', audio: 'abeja' },
    { letra: 'A', nombre: 'Avion', imagen: '/img/ObjetosLv1/Avion.png', audio: 'avion' },
    { letra: 'B', nombre: 'Bicicleta', imagen: '/img/ObjetosLv1/Bicicleta.png', audio: 'bicicleta' },
    { letra: 'B', nombre: 'Botas', imagen: '/img/ObjetosLv1/Botas.png', audio: 'botas' },
    { letra: 'C', nombre: 'Carro', imagen: '/img/ObjetosLv1/Carro.png', audio: 'carro' },
    { letra: 'C', nombre: 'Casa', imagen: '/img/ObjetosLv1/Casa.png', audio: 'casa' },
    { letra: 'D', nombre: 'Delfin', imagen: '/img/ObjetosLv1/Delfin.png', audio: 'delfin' },
    { letra: 'D', nombre: 'Dinosaurio', imagen: '/img/ObjetosLv1/Dinosaurio.png', audio: 'dinosaurio' },
    { letra: 'E', nombre: 'Elefante', imagen: '/img/ObjetosLv1/Elefante.png', audio: 'elefante' },
    { letra: 'E', nombre: 'Erizo', imagen: '/img/ObjetosLv1/Erizo.png', audio: 'erizo' },
    { letra: 'F', nombre: 'Flauta', imagen: '/img/ObjetosLv1/Flauta.png', audio: 'flauta' },
    { letra: 'F', nombre: 'Flores', imagen: '/img/ObjetosLv1/Flores.png', audio: 'flores' },
    { letra: 'G', nombre: 'Gato', imagen: '/img/ObjetosLv1/Gato.png', audio: 'gato' },
    { letra: 'G', nombre: 'Guayaba', imagen: '/img/ObjetosLv1/Guayaba.png', audio: 'guayaba' },
    { letra: 'H', nombre: 'Hielo', imagen: '/img/ObjetosLv1/Hielo.png', audio: 'hielo' },
    { letra: 'H', nombre: 'Hormiga', imagen: '/img/ObjetosLv1/Hormiga.png', audio: 'hormiga' },
    { letra: 'I', nombre: 'Iguana', imagen: '/img/ObjetosLv1/Iguana.png', audio: 'iguana' },
    { letra: 'I', nombre: 'Imán', imagen: '/img/ObjetosLv1/Iman.png', audio: 'iman' },
    { letra: 'J', nombre: 'Jabón', imagen: '/img/ObjetosLv1/Jabon.png', audio: 'jabon' },
    { letra: 'J', nombre: 'Jirafa', imagen: '/img/ObjetosLv1/Jirafa.png', audio: 'jirafa' },
    { letra: 'K', nombre: 'Karate', imagen: '/img/ObjetosLv1/Karate.png', audio: 'karate' },
    { letra: 'K', nombre: 'Koala', imagen: '/img/ObjetosLv1/Koala.png', audio: 'koala' },
    { letra: 'L', nombre: 'Lámpara', imagen: '/img/ObjetosLv1/Lampara.png', audio: 'lampara' },
    { letra: 'L', nombre: 'León', imagen: '/img/ObjetosLv1/Leon.png', audio: 'leon' },
    { letra: 'M', nombre: 'Mariposa', imagen: '/img/ObjetosLv1/Mariposa.png', audio: 'mariposa' },
    { letra: 'M', nombre: 'Mesa', imagen: '/img/ObjetosLv1/Mesa.png', audio: 'mesa' },
    { letra: 'N', nombre: 'Nido', imagen: '/img/ObjetosLv1/Nido.png', audio: 'nido' },
    { letra: 'N', nombre: 'Nube', imagen: '/img/ObjetosLv1/Nube.png', audio: 'nube' },
    { letra: 'Ñ', nombre: 'Ñandú', imagen: '/img/ObjetosLv1/Ñandu.png', audio: 'ñandu' },
    { letra: 'O', nombre: 'Olla', imagen: '/img/ObjetosLv1/Olla.png', audio: 'olla' },
    { letra: 'O', nombre: 'Oso', imagen: '/img/ObjetosLv1/Oso.png', audio: 'oso' },
    { letra: 'P', nombre: 'Pelota', imagen: '/img/ObjetosLv1/Pelota.png', audio: 'pelota' },
    { letra: 'P', nombre: 'Pingüino', imagen: '/img/ObjetosLv1/Pinguino.png', audio: 'pinguino' },
    { letra: 'Q', nombre: 'Queso', imagen: '/img/ObjetosLv1/Queso.png', audio: 'queso' },
    { letra: 'R', nombre: 'Ratón', imagen: '/img/ObjetosLv1/Raton.png', audio: 'raton' },
    { letra: 'R', nombre: 'Reloj', imagen: '/img/ObjetosLv1/Reloj.png', audio: 'reloj' },
    { letra: 'S', nombre: 'Silla', imagen: '/img/ObjetosLv1/Silla.png', audio: 'silla' },
    { letra: 'S', nombre: 'Sol', imagen: '/img/ObjetosLv1/Sol.png', audio: 'sol' },
    { letra: 'T', nombre: 'Taza', imagen: '/img/ObjetosLv1/Taza.png', audio: 'taza' },
    { letra: 'T', nombre: 'Toro', imagen: '/img/ObjetosLv1/Toro.png', audio: 'toro' },
    { letra: 'U', nombre: 'Uvas', imagen: '/img/ObjetosLv1/Uvas.png', audio: 'uvas' },
    { letra: 'V', nombre: 'Vaca', imagen: '/img/ObjetosLv1/Vaca.png', audio: 'vaca' },
    { letra: 'V', nombre: 'Vaso', imagen: '/img/ObjetosLv1/Vaso.png', audio: 'vaso' },
    { letra: 'W', nombre: 'Waffle', imagen: '/img/ObjetosLv1/Waffle.png', audio: 'waffle' },
    { letra: 'W', nombre: 'Wifi', imagen: '/img/ObjetosLv1/Wifi.png', audio: 'wifi' },
    { letra: 'X', nombre: 'Xilófono', imagen: '/img/ObjetosLv1/Xilofono.png', audio: 'xilofono' },
    { letra: 'Y', nombre: 'Yate', imagen: '/img/ObjetosLv1/Yate.png', audio: 'yate' },
    { letra: 'Y', nombre: 'Yoyo', imagen: '/img/ObjetosLv1/Yoyo.png', audio: 'yoyo' },
    { letra: 'Z', nombre: 'Zanahoria', imagen: '/img/ObjetosLv1/Zanahoria.png', audio: 'zanahoria' },
    { letra: 'Z', nombre: 'Zapato', imagen: '/img/ObjetosLv1/Zapato.png', audio: 'zapato' }
];


const datosLetras = [
    { letra: 'A', imagen: '/img/Letras/A.png' },
    { letra: 'B', imagen: '/img/Letras/B.png' },
    { letra: 'C', imagen: '/img/Letras/C.png' },
    { letra: 'D', imagen: '/img/Letras/D.png' },
    { letra: 'E', imagen: '/img/Letras/E.png' },
    { letra: 'F', imagen: '/img/Letras/F.png' },
    { letra: 'G', imagen: '/img/Letras/G.png' },
    { letra: 'H', imagen: '/img/Letras/H.png' },
    { letra: 'I', imagen: '/img/Letras/I.png' },
    { letra: 'J', imagen: '/img/Letras/J.png' },
    { letra: 'K', imagen: '/img/Letras/K.png' },
    { letra: 'L', imagen: '/img/Letras/L.png' },
    { letra: 'M', imagen: '/img/Letras/M.png' },
    { letra: 'N', imagen: '/img/Letras/N.png' },
    { letra: 'Ñ', imagen: '/img/Letras/Ñ.png' },
    { letra: 'O', imagen: '/img/Letras/O.png' },
    { letra: 'P', imagen: '/img/Letras/P.png' },
    { letra: 'Q', imagen: '/img/Letras/Q.png' },
    { letra: 'R', imagen: '/img/Letras/R.png' },
    { letra: 'S', imagen: '/img/Letras/S.png' },
    { letra: 'T', imagen: '/img/Letras/T.png' },
    { letra: 'U', imagen: '/img/Letras/U.png' },
    { letra: 'V', imagen: '/img/Letras/V.png' },
    { letra: 'W', imagen: '/img/Letras/W.png' },
    { letra: 'X', imagen: '/img/Letras/X.png' },
    { letra: 'Y', imagen: '/img/Letras/Y.png' },
    { letra: 'Z', imagen: '/img/Letras/Z.png' },
];

const Cartilla = ({ onBack }) => {
    const [letraSeleccionada, setLetraSeleccionada] = useState(null);
    const [audioKey, setAudioKey] = useState('cartilla'); // Estado para el audio actual
    const [interactable, setInteractable] = useState(false); // Estado para controlar la interacción
    const [showGif, setShowGif] = useState(false);


    useEffect(() => {
        // Reproducir audio de instrucciones después del audio de bienvenida
        if (audioKey === 'cartilla') {
            setShowGif(true);
            const timer = setTimeout(() => {
                setAudioKey('SelecCartilla');
            }, 8000); // Ajusta el tiempo según la duración del audio de bienvenida
            return () => clearTimeout(timer);
        }
        if (audioKey === 'SelecCartilla') {
            const timer = setTimeout(() => {
                setAudioKey('PulsarImg');
            }, 4000); // Ajusta el tiempo según la duración del audio de bienvenida
            return () => clearTimeout(timer);
        }
    }, [audioKey]);

    useEffect(() => {
        if (audioKey === 'PulsarImg') {
            const timer = setTimeout(() => {
                setShowGif(false);
                setInteractable(true);
            }, 5000); // ajusta el tiempo según la duración total de las instrucciones
            return () => clearTimeout(timer);
        }
    }, [audioKey]);

    const handleClickLetra = (letra) => {
        if (!interactable) return; // Evitar interacción si no es interactuable
        setLetraSeleccionada(letra);
        setAudioKey(`letra${letra}`); // Reproducir audio de la letra seleccionada
    };

    const handleClickObjeto = (audio) => {
        setAudioKey(audio); // Reproducir audio del objeto seleccionado
    };

    return (
        <div className="cartilla">
            <div className='tituloCartilla'>
                <h2>Cartilla del Abecedario</h2>
            </div>
            {showGif && (
                 <div className="overlayGif">
                    <img src={instructionGif} alt="Instruction Gif" className="instruction-gif" />
                </div>
            )}
            <AudioPlayer audioKey={audioKey} /> 
            {!letraSeleccionada ? (
                <div className='letras'>
                    {datosLetras.map(({ letra, imagen }) => (
                        <img
                            key={letra}
                            src={imagen}
                            alt={letra}
                            onClick={() => handleClickLetra(letra)}
                            className='letra-imagen'
                        />
                    ))}
                </div>
            ) : (
                <div className='secciones'>
                    <div className="letra-seccion">
                        <h3>{letraSeleccionada}</h3>
                        <div className="objetos">
                            {datosCartas
                                .filter(item => item.letra === letraSeleccionada)
                                .map(item => (
                                    <div key={item.nombre} className="objeto" onClick={() => handleClickObjeto(item.audio)}>
                                        <img src={item.imagen} alt={item.nombre} />
                                        <p>{item.nombre}</p>
                                    </div>
                                ))}
                        </div>
                    </div>
                    <button onClick={() => setLetraSeleccionada(null)}>Volver</button>
                </div>
            )}
        </div>
    );
};

export default Cartilla;
