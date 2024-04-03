import React from 'react';
// import './SummaryDreams.css'; 

const SummaryDreams = () => {
  const dreams = [
    'Become an astronaut',
    'Become an astronaut',
    'Become an astronaut',
    'Become an astronaut',
  ];
  
  const coreDream = 'Become Elon Bezos';

  return (
    <div className="summary-dreams">
      <header className="summary-header">
        <h1>affirm.</h1>
        <h2>you’re breathtaking...</h2>
        <p>Here is a summary of your dreams</p>
      </header>
      <main className="dreams-content">
        <div className="dreams-list">
          {dreams.map((dream, index) => (
            <button key={index} className="dream-button">{dream}</button>
          ))}
        </div>
        <div className="core-dream">
          <span>And the core dream</span>
          <button className="dream-button core">{coreDream}</button>
        </div>
      </main>
      <footer className="summary-footer">
        <button className="continue-button">save & continue</button>
      </footer>
    </div>
  );
};

export default SummaryDreams;
