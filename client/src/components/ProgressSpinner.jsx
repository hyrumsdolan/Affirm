import React from 'react';
import { quantum } from 'ldrs';

quantum.register();

const ProgressSpinner = ({ size = '45', speed = '1.75', color = '#648ED0' }) => {
  return (
    <div className="progress-spinner">
      <l-quantum size={size} speed={speed} color={color}></l-quantum>
    </div>
  );
};

export default ProgressSpinner;