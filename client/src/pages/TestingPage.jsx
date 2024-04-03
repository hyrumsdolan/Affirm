// Experiment with componets here

import React, { useState } from 'react';
import InputBox from '../components/InputBox';

const TEST = () => {
  // Feel free to change these states and functions to whatever you need
  const [name, setName] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
  <div className="justify-center items-center">
    {/* Please don't mess with the above classes, it centers the component */}

    <form>
      <label>
        Test:
        <InputBox
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={handleNameChange}
          required
          minLength={2}
          maxLength={50}
          autoFocus
          className="name-input"
          style={{ width: '200px'}}
        />
      </label>
    </form>



    </div>
    </div>
  );
};

export default TEST;