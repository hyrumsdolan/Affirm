import React, { useState, useEffect } from 'react';
import { getClaudeResponse } from '../utils/callClaude';
import SelectableButton from '../components/SelectableButton';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const AndNext = () => {
  const [selectedDreams, setSelectedDreams] = useState({});
  const [dreams, setDreams] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedDreams = getClaudeResponse(0,-1); // Core dream is last element
    setDreams(fetchedDreams);
  }, []);

  const toggleDreamSelection = (dream) => {
    setSelectedDreams((prevSelected) => ({
      ...prevSelected,
      [dream]: !prevSelected[dream]
    }));
  };

  const handleSave = async () => {
    try {
      navigate('/summary-dreams-page');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="and-next-page">
      <header className="and-next-header">
        <h1>affirm.</h1>
        <h2>...and next</h2>
        <p>
          Now that you've painted your 10-year future, it's important to narrow your vision down to the 10 most
          important factors of your dream. I've consolidated your dream down to several bullet points. Please
          select the TEN that matter the most to you.
        </p>
      </header>
      <main className="dreams-selection">
        {dreams.map((dream, index) => (
          <SelectableButton
            key={index}
            initialText={dream}
            disabled={selectedDreams[dream]}
            onClick={() => toggleDreamSelection(dream)}
          />
        ))}
      </main>
      <footer className="and-next-footer">
        <Button onClick={handleSave} className="continue-button">save & continue</Button>
      </footer>
    </div>
  );
};

export default AndNext;