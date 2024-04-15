import React from "react";
import { Audio } from "react-loader-spinner";
// import { quantum } from "ldrs";
// import { ring } from 'ldrs'
// ring.register("spinner-ring")
// quantum.register();

const ProgressSpinner = ({
  size = "45",
  speed = "1.75",
  color = "#648ED0"
}) => {
  return (
    <div className="progress-spinner">
      {/* <spinner-ring size={size} speed={speed} color={color}></spinner-ring> */}
      <Audio
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};

export default ProgressSpinner;
