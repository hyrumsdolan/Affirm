import React, { useEffect, useState } from 'react';
import { getClaudeResponse } from '../utils/callClaude';
import SelectableButton from '../components/SelectableButton';

const SummaryDreams = () => {
  const [dreams, setDreams] = useState([]);
  const [coreDream, setCoreDream] = useState([]);

  useEffect(() => {
    const fetchedDreams = getClaudeResponse();
    console.log(fetchedDreams);

    const fetchedDreamGeneral = fetchedDreams.slice(0, -1);
    console.log(fetchedDreamGeneral);

    const fetchedCoreDream = [fetchedDreams.slice(-1)[0]];
    console.log(fetchedCoreDream);

    setDreams(fetchedDreamGeneral);
    setCoreDream(fetchedCoreDream);
  }, []);

  return (
    <div className="summary-dreams">
      <header className="summary-header">
        <h1>affirm.</h1>
        <h2>you're breathtaking...</h2>
        <p>Here is a summary of your dreams</p>
      </header>
      <main>
        <div>
          {dreams.map((dream, index) => (
            <SelectableButton
              key={index}
              initialText={dream}
              disabled={false}
            />
          ))}
        </div>
        <div>
          <span>And the core dream</span>
          {coreDream.length > 0 && (
            <SelectableButton
              initialText={coreDream[0]}
              disabled={false}
            />
          )}
        </div>
      </main>
      <footer className="summary-footer">
        <button className="continue-button">save & continue</button>
      </footer>
    </div>
  );
};

export default SummaryDreams;