import React from "react";

const InputBox = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  disabled = false,
  required = false,
  minLength = null,
  maxLength = null,
  pattern = null,
  autoFocus = false,
  style = {},
  isTextArea = false,
  rows = 4,
  ...rest
}) => {
  const inputStyle = {
    borderRadius: "10px",
    backgroundColor: "#E4E4E4",
    borderColor: "#819EC9",
    borderStyle: "solid",
    borderWidth: "1px",
    // padding: "5px",
    // marginLeft: "5px",
    ...style
  };

  if (isTextArea) {
    return (
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input-box ${className}`}
        disabled={disabled}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        autoFocus={autoFocus}
        style={inputStyle}
        rows={rows}
        {...rest}
      />
    );
  }

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`input-box ${className}`}
      disabled={disabled}
      required={required}
      minLength={minLength}
      maxLength={maxLength}
      pattern={pattern}
      autoFocus={autoFocus}
      style={inputStyle}
      {...rest}
    />
  );
};

export default InputBox;
