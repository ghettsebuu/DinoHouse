// src/Helpers/AudioPlayer.js
import React, { useEffect, useRef } from 'react';
import audioConfig from './audioConfig';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './AudioPlayer.css'; // Asegúrate de importar el archivo CSS

const AudioPlayer = ({ audioKey }) => {
  const audioRef = useRef(null);
  const audioSrc = audioConfig[audioKey]; 

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audioSrc;
      audioRef.current.load(); // Asegúrate de cargar el nuevo audio
      audioRef.current.addEventListener('canplaythrough', () => {
        audioRef.current.play().catch(error => {
          console.error(`Error playing audio: ${error}`);
        });
      });
    }
  }, [audioKey, audioSrc]);

  if (!audioSrc) {
    console.error(`Audio file not found for key: ${audioKey}`);
    return null;
  }

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="b-audios" onClick={handlePlayAudio}>
      <i className="fa-solid fa-volume-high"></i>
      <audio ref={audioRef} />
    </div>
  );
};

export default AudioPlayer;

