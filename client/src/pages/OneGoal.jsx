import React, { useState } from 'react';

const App = () => {
  const [goal, setGoal] = useState('');

  const handleInputChange = (event) => {
    setGoal(event.target.value);
  };

  const handleSubmit = () => {
   
    console.log('Submitted goal:', goal);
   
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>affirm.</h1>
      </header>
      <main className="main-content">
        <h2>one goal to rule them all</h2>
        <p>If you could only have one goal. One guiding light, what would it be?</p>
        <input
          type="text"
          value={goal}
          onChange={handleInputChange}
          placeholder="Enter your goal"
          className="goal-input"
        />
        <button onClick={handleSubmit} className="submit-button">
          save & continue
        </button>
      </main>
    </div>
  );
};

export default App;
