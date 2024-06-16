import React, { useState, useEffect } from 'react';
import './sopadeletras.css'; // Importamos los estilos CSS

const palabras = ["PELOTA", "GOL", "ARCO", "JUGADOR"]; // Lista de palabras a buscar (puedes modificarlas)

const sopaLetras = [
  ['P', 'E', 'L', 'O', 'T', 'A', 'R', 'A'],
  ['G', 'A', 'R', 'C', 'O', 'L', 'P', 'A'],
  ['O', 'J', 'U', 'G', 'A', 'D', 'O', 'R'],
  ['P', 'L', 'E', 'T', 'O', 'A', 'G', 'L'],
  ['G', 'A', 'L', 'P', 'R', 'O', 'A', 'C'],
  ['O', 'A', 'D', 'J', 'R', 'G', 'U', 'O']
];

const ActividadLv3 = ({ mostrarActividad }) => {
  const [palabrasEncontradas, setPalabrasEncontradas] = useState([]);
  const [palabraActual, setPalabraActual] = useState(0);

  useEffect(() => {
    // Generar la sopa de letras al iniciar
    generarSopaLetras();
  }, []);

  // Función para generar la sopa de letras
  const generarSopaLetras = () => {
    const sopaElement = document.querySelector('.sopa');
    sopaElement.innerHTML = ''; // Limpiamos el contenido existente

    // Mostrar todas las letras en la sopa de letras
    sopaLetras.forEach((fila, filaIndex) => {
      const filaElement = document.createElement('div');
      filaElement.classList.add('fila');
      
      fila.forEach((letra, colIndex) => {
        const div = document.createElement('div');
        div.classList.add('letra');
        div.textContent = letra;
        filaElement.appendChild(div);
      });

      sopaElement.appendChild(filaElement);
    });
  };

  // Función para manejar el click en una palabra
  const handleClickPalabra = (indice) => {
    // Verificar si la palabra clickeada es la siguiente en la lista
    if (indice === palabraActual) {
      // Agregar la palabra encontrada a la lista
      setPalabrasEncontradas([...palabrasEncontradas, palabras[indice]]);
      
      // Avanzar a la siguiente palabra si es correcta
      if (palabraActual < palabras.length - 1) {
        setPalabraActual(palabraActual + 1);
      } else {
        alert('¡Has encontrado todas las palabras!');
        // Aquí podrías manejar el fin de la actividad, por ejemplo, volver a la pantalla principal
        mostrarActividad(false);
      }
    } else {
      // Podrías agregar lógica para indicar que la palabra no es la correcta, por ejemplo, un mensaje de error
      alert('Intenta encontrar la palabra correcta primero.');
    }
  };

  return (
    <div className="actividad">
      <h2>Sopa de letras</h2>
      <div className="sopa">
        {/* Aquí se generará dinámicamente la sopa de letras */}
      </div>
      <div className="palabras">
        <h3>Palabras a buscar:</h3>
        <ul>
          {palabras.map((palabra, index) => (
            <li key={index} className={palabrasEncontradas.includes(palabra) ? 'palabra-encontrada' : ''} onClick={() => handleClickPalabra(index)}>
              {palabra}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ActividadLv3;
