// PlayButton.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PlayButton = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.setItem('test', 'testValue');
      const testValue = localStorage.getItem('test');
      if (testValue !== 'testValue') {
       console.error('localStorage is not working properly');
      } else {
        localStorage.removeItem('test');
      }
    } catch (error) {
      console.error('localStorage is not accessible:', error);
    }
  }, []);
  

  const handleClick = () => {
    console.log('Button clicked');
    const studentName = localStorage.getItem('studentName');
  
    if (studentName) {
      console.log('Navigating to /PanelPlay');
      navigate('/PanelPlay');
    } else {
      console.log('Navigating to /SelectLogin');
      navigate('/SelectLogin');
    }
  };
  

  return (
    <button onClick={handleClick} className="play-button">
      <i className="fa-solid fa-play"></i>
    </button>
  );
};

export default PlayButton;
