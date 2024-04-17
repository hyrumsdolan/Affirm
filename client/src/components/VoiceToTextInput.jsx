import React, { useState, useEffect } from 'react';

function VoiceToTextInput({ placeholder, value, onChange }) {
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = SpeechRecognition ? new SpeechRecognition() : null;

    if (recognitionInstance) {
      recognitionInstance.onresult = (event) => {
        onChange(event.results[0][0].transcript);
      };

      recognitionInstance.onend = () => {
        if (isListening) recognitionInstance.start();
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }

    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) recognitionInstance.stop();
    };
  }, [isListening, onChange]);

  const toggleListening = () => {
    if (recognition) {
      if (isListening) {
        recognition.stop();
      } else {
        recognition.start();
      }
      setIsListening(!isListening);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <button onClick={toggleListening} disabled={!recognition}>
        {isListening ? 'Stop' : 'Speak'}
      </button>
    </div>
  );
}

export default VoiceToTextInput;