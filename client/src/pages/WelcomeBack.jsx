import React, { useState } from 'react';
// import './WelcomeBack.css'; 

const WelcomeBack = () => {
  const [gratitudes, setGratitudes] = useState(['The weather was so god damn beautiful today', '', '', '', '']);
  const [mainDream] = useState('Become Elon Bezos');

  const handleGratitudeChange = (index, value) => {
    const updatedGratitudes = [...gratitudes];
    updatedGratitudes[index] = value;
    setGratitudes(updatedGratitudes);
  };

  return (
    <div className="welcome-back-page">
      <header className="welcome-header">
        <h1>affirm.</h1>
        <h2>welcome back :)</h2>
        <p>Let’s get affirming.</p>
      </header>
      <main className="content">
        <section className="gratitudes-section">
          {gratitudes.map((gratitude, index) => (
            <div key={index} className="gratitude-item">
              <input
                type="text"
                value={gratitude}
                onChange={(e) => handleGratitudeChange(index, e.target.value)}
                placeholder="input gratitude here..."
              />
              <span className="edit-icon">✏️</span>
            </div>
          ))}
        </section>
        <section className="main-dream-section">
          <div className="main-dream">
            <span>The main dream</span>
            <button className="dream-button">{mainDream}</button>
          </div>
        </section>
      </main>
      <footer className="welcome-footer">
        <button className="continue-button">save & continue</button>
      </footer>
    </div>
  );
};

export default WelcomeBack;
