import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MicrophoneButton from './MicrophoneButton';
import Button from './Button';
import { sendToClaude } from '../utils/callClaude';

function TenYearDreamForm() {
  const [dreamText, setDreamText] = useState("");
  const [lastAppendedTranscript, setLastAppendedTranscript] = useState("");
  const navigate = useNavigate();

  const handleChange = event => {
    setDreamText(event.target.value);
  };

  const handleTranscript = transcript => {
    if (transcript.trim() !== lastAppendedTranscript.trim()) {
      console.log(transcript);
      setDreamText(transcript.trim());
      setLastAppendedTranscript(transcript);
    }
  };

  const handleSave = async () => {
    try {
      dreamText ? await sendToClaude(dreamText) : console.log("No dream to save");// Probably need a better way to handle this
      console.log("Saving dream:", dreamText);
      navigate('/and-next');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex h-screen flex-col pb-32">
      <div className="relative flex flex-grow">
        <textarea
          className="block w-full flex-grow resize-none appearance-none rounded-md border border-gray-300 px-3 py-2
            placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:placeholder:opacity-0 sm:text-sm"
          value={dreamText}
          onChange={handleChange}
          placeholder="Type or speak your dream into the box below"
        />
        <div className="absolute bottom-2 right-2">
          <MicrophoneButton onTranscript={handleTranscript} />
        </div>
      </div>
      <Button onClick={handleSave}>save & continue</Button>
    </div>
  );
}

export default TenYearDreamForm;