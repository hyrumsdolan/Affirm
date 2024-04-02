import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { HiOutlineMicrophone, HiMiniMicrophone } from "react-icons/hi2";

function MicrophoneButton({ onTranscript }) {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const [latestTranscript, setLatestTranscript] = useState('');

  useEffect(() => {
    if (transcript && transcript !== latestTranscript) {
      setLatestTranscript(transcript);
      onTranscript(transcript);
    }
  }, [transcript, latestTranscript, onTranscript]);

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

  return (
    <button
      className={`microphone-button ${listening ? 'listening' : ''}`}
      onClick={toggleListening}
    >
      <span className="icon-wrapper">
        {listening ? (
          <HiMiniMicrophone className="animate-pulse" color="#6E95D3" />
        ) : (
          <HiOutlineMicrophone color="#6E95D3" />
        )}
      </span>
    </button>
  );
}

export default MicrophoneButton;
