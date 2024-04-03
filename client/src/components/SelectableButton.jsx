import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

// use this button component like this:
// <SelectableButton initialText="Button 1" onSelect={handleSelect} onTextChange={handleTextChange} disabled={false} />
// <SelectableButton initialText="Button 2" onSelect={handleSelect} onTextChange={handleTextChange} disabled={true} />

const SelectableButton = ({ initialText, onSelect, onTextChange, disabled = false }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [buttonText, setButtonText] = useState(initialText);

  const handleSelect = () => {
    if (!disabled) {
      const newIsSelected = !isSelected;
      setIsSelected(newIsSelected);
      onSelect(newIsSelected);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTextChange = (e) => {
    setButtonText(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    onTextChange(buttonText);
  };

  const buttonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '485px',
    height: '72px',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: isSelected && !disabled ? '#8B9CB6' : '#CCCCCC',
    color: '#ffffff',
    cursor: disabled ? 'default' : 'pointer',
    outline: 'none',
  };

  const circleStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: '2px solid #ffffff',
    marginRight: '10px',
    backgroundColor: isSelected && !disabled ? '#ECFFCC' : 'transparent',
  };

  const checkmarkStyle = {
    color: '#A39191',
  };

  const inputStyle = {
    width: '100%',
    padding: '5px',
    border: 'none',
    borderBottom: '1px solid #2E7DFF',
    backgroundColor: 'transparent',
    color: '#2E7DFF',
    outline: 'none',
  };

  const iconStyle = {
    marginLeft: 'auto',
    color: '#2E7DFF',
    cursor: 'pointer',
  };

  return (
    <div style={buttonStyle} onClick={handleSelect}>
      {!disabled && (
        <div style={circleStyle}>
          {isSelected && <FaCheck style={checkmarkStyle} />}
        </div>
      )}
      {isEditing ? (
        <input
          type="text"
          value={buttonText}
          onChange={handleTextChange}
          onBlur={handleSave}
          autoFocus
          style={inputStyle}
        />
      ) : (
        <>
          <span>{buttonText}</span>
          <span style={iconStyle} onClick={(e) => {
            e.stopPropagation();
            handleEdit();
          }}>
            ✎
          </span>
        </>
      )}
    </div>
  );
};

export default SelectableButton;