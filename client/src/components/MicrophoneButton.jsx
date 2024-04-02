import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { FaMicrophoneLines } from 'react-icons/fa6';

function MicrophoneButton({ onTranscript }) {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  React.useEffect(() => {
    onTranscript(transcript);
  }, [onTranscript, transcript]);

  return (
    <div>
      <button
        className={`microphone-button ${listening ? 'listening' : ''}`}
        onClick={toggleListening}
      >
        <FaMicrophoneLines />
      </button>
      {listening && <button onClick={resetTranscript}>Reset</button>}
    </div>
  );
}

export default MicrophoneButton;