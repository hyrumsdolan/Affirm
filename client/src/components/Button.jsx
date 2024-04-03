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
  const buttonStyle = {
    borderRadius: '20px',
    backgroundColor: '#4F46E5',
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