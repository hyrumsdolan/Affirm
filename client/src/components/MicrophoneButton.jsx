import React, { useState } from 'react';

function MicrophoneButton() {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      startSpeechRecognition();
    } else {
      stopSpeechRecognition();
    }
  };

  const startSpeechRecognition = () => {
    // TODO: Implement speech recognition logic
    console.log('Starting speech recognition...');
  };

  const stopSpeechRecognition = () => {
    // TODO: Implement speech recognition logic
    console.log('Stopping speech recognition...');
  };

  return (
    <button
      className={`microphone-button ${isListening ? 'listening' : ''}`}
      onClick={toggleListening}
    >
      {isListening ? 'Stop' : 'Start'}
    </button>
  );
}

export default MicrophoneButton;