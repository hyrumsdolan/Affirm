import React, { useState } from 'react';
import MicrophoneButton from '../components/MicrophoneButton';

function DreamForm() {
  const [dreamText, setDreamText] = useState('');

  const handleChange = (event) => {
    setDreamText(event.target.value);
  };

  const handleTranscript = (transcript) => {
    setDreamText(prevText => prevText + ' ' + transcript);
  };

  const handleSave = () => {
    // TODO: Save the dreamText to a backend API or local storage
    console.log('Saving dream:', dreamText);
  };

  return (
    <div className="dream-form">
      <textarea
        value={dreamText}
        onChange={handleChange}
        placeholder="Type or speak your dream into the box below"
      />
      <MicrophoneButton onTranscript={handleTranscript} />
      <button onClick={handleSave}>Save &amp; continue</button>
    </div>
  );
}

export default DreamForm;