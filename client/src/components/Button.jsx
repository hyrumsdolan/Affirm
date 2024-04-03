// Buttons like the login, Save and Continue button, meant for navigation
import React from 'react';

const Button = ({
  type = 'button',
  onClick,
  className = '',
  disabled = false,
  style = {},
  children,
  ...rest
}) => {
    // TODO: Update with global variables.
  const buttonStyle = {
    borderRadius: '20px',
    backgroundColor: '#819EC9',
    color: '#FFFFFF',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    ...style,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${className}`}
      disabled={disabled}
      style={buttonStyle}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;