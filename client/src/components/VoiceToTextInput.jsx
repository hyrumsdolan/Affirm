import React, { useState, useEffect } from 'react';

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

function VoiceToTextInput({ placeholder, value, onChange }) {
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    recognition.onresult = (event) => {
      onChange(event.results[0][0].transcript);
    };

    recognition.onend = () => {
      if (isListening) recognition.start();
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
    };

    return () => recognition.stop();
  }, [isListening, onChange]);

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={toggleListening}>
        {isListening ? 'Stop' : 'Speak'}
      </button>
    </div>
  );
}

export default VoiceToTextInput;
