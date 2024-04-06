import React from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { ADD_BIG_DREAM, ADD_LITTLE_DREAM, ADD_ULTIMATE_GOAL } from '../utils/mutations';

const Button = ({
  type = 'button',
  user,
  onClick,
  className = '',
  disabled = false,
  style = {},
  children,
  input = '',
  saveToUser = '',
  navigateTo = '',
  isEnabled = true,
  ...rest
}) => {
  const navigate = useNavigate();
  const [addBigDream] = useMutation(ADD_BIG_DREAM);
  const [addLittleDream] = useMutation(ADD_LITTLE_DREAM);
  const [addUltimateGoal] = useMutation(ADD_ULTIMATE_GOAL);

  const handleClick = async () => {
    if (!isEnabled) {
      return;
    }
    console.log(user.me)

    if (saveToUser === 'bigdream') {
      console.log(user)
      await addBigDream({ variables: { bigDream: input } });
    } else if (saveToUser === 'littledream') {
      await addLittleDream({ variables: { littleDream: input } });
    } else if (saveToUser === 'ultimategoal') {
      await addUltimateGoal({ variables: { ultimateGoal: input } });
    }

    if (onClick) {
      onClick();
    }

    if (navigateTo) {
      navigate(navigateTo);
    }
  };

  // TODO: Update with global variables.
  const buttonStyle = {
    borderRadius: '20px',
    backgroundColor: '#819EC9',
    color: '#FFFFFF',
    padding: '10px 20px',
    border: 'none',
    cursor: isEnabled ? 'pointer' : 'not-allowed',
    ...style,
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`button ${className}`}
      disabled={disabled || !isEnabled}
      style={buttonStyle}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;