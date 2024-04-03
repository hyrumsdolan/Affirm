import React, { useState } from 'react';
// import './AndNext.css'; 

const AndNext = () => {
  const [selectedDreams, setSelectedDreams] = useState({});

  const dreams = [
    
    'Become an astronaut', 
    'Become an astronaut', 
    'Become an astronaut', 
    'Become an astronaut', 
    'Become an astronaut', 
    'Become an astronaut', 
    'Become an astronaut', 
    'Become an astronaut', 
    
  ];

  const toggleDreamSelection = (dream) => {
    setSelectedDreams((prevSelected) => ({
      ...prevSelected,
      [dream]: !prevSelected[dream]
    }));
  };

  return (
    <div className="and-next-page">
      <header className="and-next-header">
        <h1>affirm.</h1>
        <h2>...and next</h2>
        <p>
          Now, that you’ve painted your 10 year future, it’s important to narrow your vision down to the 10 most
          important factors of your dream. I’ve consolidated your dream down to several bullet points. Please
          select the TEN that matter the most to you.
        </p>
      </header>
      <main className="dreams-selection">
        {dreams.map((dream, index) => (
          <div 
            key={index} 
            className={`dream-item ${selectedDreams[dream] ? 'selected' : ''}`} 
            onClick={() => toggleDreamSelection(dream)}
          >
            {dream}
            <span className="edit-icon">✏️</span>
          </div>
        ))}
      </main>
      <footer className="and-next-footer">
        <button className="continue-button">save & continue</button>
      </footer>
    </div>
  );
};

export default AndNext;
