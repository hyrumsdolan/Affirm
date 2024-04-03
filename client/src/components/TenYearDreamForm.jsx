import { useState } from 'react';
import MicrophoneButton from './MicrophoneButton';
import Button from './Button';

function TenYearDreamForm() {
  const [dreamText, setDreamText] = useState('');
  const [lastAppendedTranscript, setLastAppendedTranscript] = useState('');

  const handleChange = (event) => {
    setDreamText(event.target.value);
  };

  const handleTranscript = (transcript) => {
    // Check if the transcript is different from the last appended transcript
    if (transcript.trim() !== lastAppendedTranscript.trim()) {
      // Append the transcript to the dreamText state
      setDreamText(prevText => prevText.trim() + ' ' + transcript.trim());
      // Update the last appended transcript
      setLastAppendedTranscript(transcript);
    }
  };

  const handleSave = () => {
    // TODO: Save the dreamText to a backend API or local storage
    console.log('Saving dream:', dreamText);
  };

  return (
    <div className="dream-form">
      <div className="textarea-container relative">
        <textarea
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={dreamText}
          onChange={handleChange}
          placeholder="Type or speak your dream into the box below"
        />
        <div className="microphone-container absolute bottom-2 right-2">
          {/* Pass the handleTranscript function directly to MicrophoneButton */}
          <MicrophoneButton onTranscript={handleTranscript} />
        </div>
      </div>
<Button onClick={handleSave}>save & continue</Button>
    </div>
  );
}

export default TenYearDreamForm;
