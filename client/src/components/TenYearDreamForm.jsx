import { useState } from 'react';

function TenYearDreamForm() {
  const [dreamText, setDreamText] = useState('');

  const handleChange = (event) => {
    setDreamText(event.target.value);
  };

  const handleSave = () => {
    // TODO: Save the dreamText to a backend API
    console.log('Saving dream:', dreamText);
  };

  return (
    <div className="ten-year-dream-form">
      <textarea
        value={dreamText}
        onChange={handleChange}
        placeholder="Type or speak your dream into the box below"
      />
      <button onClick={handleSave}>Save &amp; continue</button>
    </div>
  );
}

export default TenYearDreamForm;