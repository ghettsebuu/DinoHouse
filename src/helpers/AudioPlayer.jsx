// src/Helpers/AudioPlayer.js
import React, { useEffect, useRef, useState } from 'react';
import audioConfig from './audioConfig';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './AudioPlayer.css';




const AudioPlayer = ({ audioKey, isInstruction = false }) => {
  const audioRef = useRef(null);
  const audioSrc = audioConfig[audioKey]; 
  const [currentAudioKey, setCurrentAudioKey] = useState(audioKey);

  useEffect(() => {
    if (audioRef.current && audioSrc) {
      audioRef.current.src = audioSrc;
      audioRef.current.load(); 
      audioRef.current.play().catch(error => {
        console.error(`Error playing audio: ${error}`);
      });
    }
  }, [audioSrc, currentAudioKey]);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      if (!isInstruction) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
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
