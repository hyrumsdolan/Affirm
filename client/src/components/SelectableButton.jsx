import React, { useState, useRef, useEffect } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";

const SelectableButton = ({
  canSelect = true,
  startSelected = false,
  showEditButton = true,
  editOnClick = false,
  selectIfInput = false,
  id = 0,
  initialText = "",
  placeholderText = "Type here...",
  className = "",
  focused = false,
  onFocus = () => {},
  onSubmit = () => {},
  onTextChange = () => {},
  onSelect = () => {}
}) => {
  const [selected, setSelected] = useState(startSelected);
  const [editing, setEditing] = useState(false);
  const [inputText, setInputText] = useState(initialText);
  const inputRef = useRef(null);

  const handleClick = () => {
    if (!canSelect || editing) return;
    if (selectIfInput && !inputText) return;
    const newSelected = !selected;
    setSelected(newSelected);
    onSelect(newSelected); // Call the onSelect prop with the new selection state
  };

  const handleEdit = () => {
    setEditing(true);
    console.log("Selected:");
    onFocus();
  };

  const handleSave = () => {
    setEditing(false);
    if (inputText) {
      setSelected(true);
    }
    onSubmit();
  };

  const handleInputChange = e => {
    const newText = e.target.value;
    setInputText(newText);
    onTextChange(newText);
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  useEffect(() => {
    if (focused) {
      setEditing(true);
    }
  }, [focused]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = e => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  const getGradientStyle = () => {
    const { x, y } = mousePosition;
    const gradientX = (x / 485) * 100;
    const gradientY = (y / 72) * 100;
    return {
      background: `radial-gradient(at ${gradientX}% ${gradientY}%, ${
        selected ? "#6F8AA3" : "#C7DAFF"
      }, ${selected ? "#8B9CB6" : "#E6F0FF"})`
    };
  };
  
  const containerClasses = `${className} relative w-auto h-auto pl-5 pr-16 text-center py-5 flex items-center justify-center rounded-full ${
    selected
      ? "bg-gradient-to-r from-[#8B9CB6] to-[#6F8AA3] text-[#ECFFCC] hover:from-[#6F8AA3] hover:to-[#8B9CB6]"
      : "bg-gradient-to-r from-[#E6F0FF] to-[#C7DAFF] text-[#003366] hover:from-[#C7DAFF] hover:to-[#E6F0FF]"
  } ${editing ? "cursor-text" : "cursor-pointer"} transition duration-300 ease-in-out hover:scale-105 shadow-md hover:shadow-lg`;

  const inputClasses = `w-full h-full px-6 outline-none rounded-full bg-transparent text-inherit`;

  const editButtonClasses = `absolute top-1/2 right-6 transform -translate-y-1/2 ${
    selected ? "text-[#ECFFCC]" : "text-[#003366]"
  } transition duration-300 ease-in-out`;

  return (
    <div
      className={containerClasses}
      id={id}
      onClick={editOnClick ? handleEdit : handleClick}
      onMouseMove={handleMouseMove}
      style={getGradientStyle()}
    >
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onBlur={handleBlur}
          placeholder={placeholderText}
          className={inputClasses}
        />
      ) : (
        <span>{inputText || placeholderText}</span>
      )}
      {showEditButton && !editing && (
        <button className={editButtonClasses} onClick={handleEdit}>
          <FaEdit />
        </button>
      )}
    </div>
  );
};

export default SelectableButton;
