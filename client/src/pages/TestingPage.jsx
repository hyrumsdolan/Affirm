import React, { useState, useEffect } from 'react';
import InputBox from '../components/InputBox';
import SettingsDropdown from '../components/settingsDropdown';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { CALL_CLAUDE } from '../utils/mutations';


const TEST = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [callClaude] = useMutation(CALL_CLAUDE);

  // useEffect(() => {
  //   // Retrieve the response from local storage when the component mounts
  //   const storedResponse = localStorage.getItem('claudeResponse');
  //   if (storedResponse) {
  //     setResponse(storedResponse);
  //   }
  // }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await callClaude({ variables: { input } });
      const result = data.callClaude;
      setResponse(result);
      // Store the response in local storage
      localStorage.setItem('claudeResponse', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="justify-center items-center relative">
        <form onSubmit={handleSubmit}>
          <label>
            Test:
            <InputBox
              isTextArea
              type="text"
              placeholder="Enter your input"
              value={input}
              onChange={handleInputChange}
              required
              minLength={2}
              maxLength={100000}
              autoFocus
              className="name-input"
              style={{ width: '200px' }}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <div>
          <h3>Response:</h3>
          <p>{response}</p>
        </div>
      </div>
    </div>
  );
};

export default TEST;