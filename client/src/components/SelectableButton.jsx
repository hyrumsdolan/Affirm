import React, { useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";

const SelectableButton = ({
  initialText,
  onSelect,
  onTextChange,
  disabled = false,
  width = "485px",
  height = "72px",
  // Added new prop to control the visibility of the edit button
  showEditButton = true,
  // Added new prop to control the initial selected state of the button
  initialSelected = false,
  // Added new prop for placeholder text
  placeholderText = ""
}) => {
  // Updated the initial selected state based on the new prop
  const [isSelected, setIsSelected] = useState(initialSelected);
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

  const handleTextChange = e => {
    setButtonText(e.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    onTextChange(buttonText);
  };

  const buttonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: width,
    height: height,
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: isSelected && !disabled ? "#8B9CB6" : "#CCCCCC",
    color: isSelected && !disabled ? "#ECFFCC" : "#ffffff",
    cursor: disabled ? "default" : "pointer",
    outline: "none",
    transition: "background-color 0.3s ease"
  };

  const circleStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    border: "2px solid #ffffff",
    marginRight: "10px",
    backgroundColor: isSelected && !disabled ? "#ECFFCC" : "transparent"
  };

  const checkmarkStyle = {
    color: "#A39191"
  };

  const inputStyle = {
    width: "100%",
    padding: "5px",
    border: "none",
    borderBottom: "1px solid #2E7DFF",
    backgroundColor: "transparent",
    color: "#2E7DFF",
    outline: "none"
  };

  const iconStyle = {
    marginLeft: "auto",
    color: isSelected && !disabled ? "#ffffff" : "#2E7DFF",
    cursor: "pointer"
  };

  return (
    <div style={buttonStyle} onClick={handleSelect}>
      {/* {!disabled && (
        <div style={circleStyle}>
          {isSelected && <FaCheck style={checkmarkStyle} />}
        </div>
      )} */}
      {isEditing ? (
        <input
          type="text"
          value={buttonText}
          onChange={handleTextChange}
          onBlur={handleSave}
          autoFocus
          style={inputStyle}
          // Added placeholder text
          placeholder={placeholderText}
        />
      ) : (
        <>
          <span>{buttonText}</span>
          {/* Added conditional rendering of the edit button */}
          {showEditButton && (
            <span
              style={iconStyle}
              onClick={e => {
                e.stopPropagation();
                handleEdit();
              }}
            >
              <FaEdit />
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default SelectableButton;