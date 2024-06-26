// GuardarPuntuacion.js
import { db } from '../Firebase/firebaseConfig';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const guardarPuntuacion = async (codigoAcceso, level, puntos) => {
  try {
    if (typeof codigoAcceso !== 'string' || typeof level !== 'number' || typeof puntos !== 'number') {
      throw new Error('Invalid parameters');
    }

    const docRef = doc(db, 'Puntuacion', codigoAcceso);
    const docSnap = await getDoc(docRef);

    const puntuacionData = docSnap.exists() ? docSnap.data() : {};

    const puntosPrevios = puntuacionData[`Level${level}`] || 0; // Obtener puntos anteriores si existen
    const nuevaPuntuacion = {
      ...puntuacionData,
      [`Level${level}`]: puntosPrevios + puntos, // Sumar nueva puntuación a la anterior
      fechaMasReciente: new Date().toISOString()
    };

    await setDoc(docRef, nuevaPuntuacion, { merge: true });
    console.log("Puntuación guardada exitosamente");
  } catch (error) {
    console.error("Error al guardar la puntuación:", error);
  }
};

export default guardarPuntuacion;

