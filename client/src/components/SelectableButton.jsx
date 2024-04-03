import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const SelectableButton = ({ initialText, onSelect, onTextChange }) => {
  const [isSelected, setIsSelected] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [buttonText, setButtonText] = useState(initialText);

  const handleSelect = () => {
    const newIsSelected = !isSelected;
    setIsSelected(newIsSelected);
    onSelect(newIsSelected);
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
    backgroundColor: isSelected ? '#8B9CB6' : '#CCCCCC',
    color: '#ffffff',
    cursor: 'pointer',
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
    backgroundColor: isSelected ? '#ECFFCC' : 'transparent',
  };

  const checkmarkStyle = {
    color: '#A39191',
  };

  const inputStyle = {
    width: '100%',
    padding: '5px',
    border: 'none',
    borderBottom: '1px solid #FFFFFF',
    backgroundColor: 'transparent',
    color: '#FFFFFF',
    outline: 'none',
  };

  const iconStyle = {
    marginLeft: 'auto',
    color: '#FFFFFF',
    cursor: 'pointer',
  };

  return (
    <div style={buttonStyle} onClick={handleSelect}>
      <div style={circleStyle}>
        {isSelected && <FaCheck style={checkmarkStyle} />}
      </div>
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