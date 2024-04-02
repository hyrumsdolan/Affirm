import React, { useState } from 'react';
import MicrophoneButton from './MicrophoneButton';

function TenYearDreamForm() {
  const [dreamText, setDreamText] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!dreamText) return;

    setIsSaving(true);
    try {
      // TODO: Save the dreamText to your backend API or local storage
      await saveDreamText(dreamText);
      setDreamText('');
      setError(null);
    } catch (err) {
      setError('Failed to save the dream. Please try again.');
    }
    setIsSaving(false);
  };

  const handleChange = (event) => {
    setDreamText(event.target.value);
  };

  const handleTranscript = (transcript) => {
    setDreamText(prevText => prevText + ' ' + transcript);
  };

  return (
    <form className="dream-form" onSubmit={handleSubmit}>
      <label htmlFor="dream-text">Dream Text:</label>
      <textarea
        id="dream-text"
        value={dreamText}
        onChange={handleChange}
        placeholder="Type or speak your dream into the box below"
        required
      />
      <MicrophoneButton onTranscript={handleTranscript} />
      <button type="submit" disabled={!dreamText || isSaving}>
        {isSaving ? 'Saving...' : 'Save & continue'}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TenYearDreamForm;