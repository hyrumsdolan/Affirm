import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MicrophoneButton from './MicrophoneButton';
import Button from './Button';
import { sendToClaude } from '../utils/callClaude';

function TenYearDreamForm({ user }) {
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
      console.log("Saving dream:", dreamText);
      navigate('/and-next');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col h-full pb-32">
      <div className="relative flex flex-grow">
        <textarea
          className="block w-full resize-none rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          value={dreamText}
          onChange={handleChange}
          placeholder="Type or speak your dream into the box below"
        />
        <div className="absolute bottom-2 right-2">
          <MicrophoneButton onTranscript={handleTranscript} />
        </div>
      </div>
      <Button
        className="mt-4 w-full"
        user={user}
        isEnabled={dreamText.length > 10}
        onClick={handleSave}
      >
        save & continue
      </Button>
    </div>
  );
}

export default TenYearDreamForm;