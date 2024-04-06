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
    <div className="">
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 justify-around">
            {dreams.map((dream, index) => (
              <div className='m-10'>
                <SelectableButton
                
                    key={index}
                    initialText={dream}
                    disabled={selectedDreams[dream]}
                    onClick={() => toggleDreamSelection(dream)}
                />
                </div>
            ))}
        </main>
        <Button onClick={handleSave} className="r-0 absolute right-0 m-10">save & continue</Button>
    </div>
);

};

export default AndNext;