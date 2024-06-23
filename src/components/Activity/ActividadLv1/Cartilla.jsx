// src/components/Activity/ActividadLv1/Cartilla.jsx
import React, { useState } from 'react';
import './Cartilla.css';

const datosCartas = [
    { letra: 'A', nombre: 'Abeja', imagen: '/img/ObjetosLv1/Abeja.png' },
    { letra: 'A', nombre: 'Avion', imagen: '/img/ObjetosLv1/Avion.png' },
    { letra: 'B', nombre: 'Bicicleta', imagen: '/img/ObjetosLv1/Bicicleta.png' },
    { letra: 'B', nombre: 'Botas', imagen: '/img/ObjetosLv1/Botas.png' },
    { letra: 'C', nombre: 'Carro', imagen: '/img/ObjetosLv1/Carro.png' },
    { letra: 'C', nombre: 'Casa', imagen: '/img/ObjetosLv1/Casa.png' },
    { letra: 'D', nombre: 'Delfin', imagen: '/img/ObjetosLv1/Delfin.png' },
    { letra: 'D', nombre: 'Dinosaurio', imagen: '/img/ObjetosLv1/Dinosaurio.png' },
    { letra: 'E', nombre: 'Elefante', imagen: '/img/ObjetosLv1/Elefante.png' },
    { letra: 'E', nombre: 'Erizo', imagen: '/img/ObjetosLv1/Erizo.png' },
    { letra: 'F', nombre: 'Flauta', imagen: '/img/ObjetosLv1/Flauta.png' },
    { letra: 'F', nombre: 'Flores', imagen: '/img/ObjetosLv1/Flores.png' },
    { letra: 'G', nombre: 'Gato', imagen: '/img/ObjetosLv1/Gato.png' },
    { letra: 'G', nombre: 'Guayaba', imagen: '/img/ObjetosLv1/Guayaba.png' },
    { letra: 'H', nombre: 'Hielo', imagen: '/img/ObjetosLv1/Hielo.png' },
    { letra: 'H', nombre: 'Hormiga', imagen: '/img/ObjetosLv1/Hormiga.png' },
    { letra: 'I', nombre: 'Iguana', imagen: '/img/ObjetosLv1/Iguana.png' },
    { letra: 'I', nombre: 'Imán', imagen: '/img/ObjetosLv1/Iman.png' },
    { letra: 'J', nombre: 'Jabón', imagen: '/img/ObjetosLv1/Jabon.png' },
    { letra: 'J', nombre: 'Jirafa', imagen: '/img/ObjetosLv1/Jirafa.png' },
    { letra: 'K', nombre: 'Karate', imagen: '/img/ObjetosLv1/Karate.png' },
    { letra: 'K', nombre: 'Koala', imagen: '/img/ObjetosLv1/Koala.png' },
    { letra: 'L', nombre: 'Lámpara', imagen: '/img/ObjetosLv1/Lampara.png' },
    { letra: 'L', nombre: 'León', imagen: '/img/ObjetosLv1/Leon.png' },
    { letra: 'M', nombre: 'Mariposa', imagen: '/img/ObjetosLv1/Mariposa.png' },
    { letra: 'M', nombre: 'Mesa', imagen: '/img/ObjetosLv1/Mesa.png' },
    { letra: 'N', nombre: 'Nido', imagen: '/img/ObjetosLv1/Nido.png' },
    { letra: 'N', nombre: 'Nube', imagen: '/img/ObjetosLv1/Nube.png' },
    { letra: 'Ñ', nombre: 'Ñandú', imagen: '/img/ObjetosLv1/Ñandu.png' },
    { letra: 'O', nombre: 'Olla', imagen: '/img/ObjetosLv1/Olla.png' },
    { letra: 'O', nombre: 'Oso', imagen: '/img/ObjetosLv1/Oso.png' },
    { letra: 'P', nombre: 'Pelota', imagen: '/img/ObjetosLv1/Pelota.png' },
    { letra: 'P', nombre: 'Pingüino', imagen: '/img/ObjetosLv1/Pinguino.png' },
    { letra: 'Q', nombre: 'Queso', imagen: '/img/ObjetosLv1/Queso.png' },
    { letra: 'R', nombre: 'Ratón', imagen: '/img/ObjetosLv1/Raton.png' },
    { letra: 'R', nombre: 'Reloj', imagen: '/img/ObjetosLv1/Reloj.png' },
    { letra: 'S', nombre: 'Silla', imagen: '/img/ObjetosLv1/Silla.png' },
    { letra: 'S', nombre: 'Sol', imagen: '/img/ObjetosLv1/Sol.png' },
    { letra: 'T', nombre: 'Taza', imagen: '/img/ObjetosLv1/Taza.png' },
    { letra: 'T', nombre: 'Toro', imagen: '/img/ObjetosLv1/Toro.png' },
    { letra: 'U', nombre: 'Uvas', imagen: '/img/ObjetosLv1/Uvas.png' },
    { letra: 'V', nombre: 'Vaca', imagen: '/img/ObjetosLv1/Vaca.png' },
    { letra: 'V', nombre: 'Vaso', imagen: '/img/ObjetosLv1/Vaso.png' },
    { letra: 'W', nombre: 'Waffle', imagen: '/img/ObjetosLv1/Waffle.png' },
    { letra: 'W', nombre: 'Wifi', imagen: '/img/ObjetosLv1/Wifi.png' },
    { letra: 'X', nombre: 'Xilófono', imagen: '/img/ObjetosLv1/Xilofono.png' },
    { letra: 'Y', nombre: 'Yate', imagen: '/img/ObjetosLv1/Yate.png' },
    { letra: 'Y', nombre: 'Yoyo', imagen: '/img/ObjetosLv1/Yoyo.png' },
    { letra: 'Z', nombre: 'Zanahoria', imagen: '/img/ObjetosLv1/Zanahoria.png' },
    { letra: 'Z', nombre: 'Zapato', imagen: '/img/ObjetosLv1/Zapato.png' }
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

    const handleClick = (letra) => {
        setLetraSeleccionada(letra);
    };

    return (
        <div className="cartilla">
            {/* <button onClick={onBack}>Volver</button> */}
            <div className='tituloCartilla'>
                <h2>Cartilla del Abecedario</h2>
            </div>
            {!letraSeleccionada ? (
                <div className='letras'>
                    {datosLetras.map(({ letra, imagen }) => (
                        <img
                            key={letra}
                            src={imagen}
                            alt={letra}
                            onClick={() => handleClick(letra)}
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
                                    <div key={item.nombre} className="objeto">
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
