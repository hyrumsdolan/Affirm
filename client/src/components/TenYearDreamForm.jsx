import { useState } from "react";
import MicrophoneButton from "./MicrophoneButton";

function TenYearDreamForm() {
  const [dreamText, setDreamText] = useState("");
  const [lastAppendedTranscript, setLastAppendedTranscript] = useState("");

  const handleChange = event => {
    setDreamText(event.target.value);
  };

  const handleTranscript = transcript => {
    // Check if the transcript is different from the last appended transcript
    if (transcript.trim() !== lastAppendedTranscript.trim()) {
      console.log(transcript);
      // Append the transcript to the dreamText state
      setDreamText(transcript.trim());
      // Update the last appended transcript
      setLastAppendedTranscript(transcript);
    }
  };

  const handleSave = () => {
    // TODO: Save the dreamText to a backend API or local storage
    console.log("Saving dream:", dreamText);
  };

  return (
    <div className="flex h-screen flex-col pb-32">
      <div className="relative flex flex-grow">
        <textarea
          className="block w-full flex-grow resize-none appearance-none rounded-md border border-gray-300 px-3 py-2 
placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 focus:placeholder:opacity-0 sm:text-sm"
          value={dreamText}
          onChange={handleChange}
          placeholder="Type or speak your dream into the box below"
        />
        <div className="absolute bottom-2 right-2">
          {/* Pass the handleTranscript function directly to MicrophoneButton */}
          <MicrophoneButton onTranscript={handleTranscript} />
        </div>
      </div>
      <button
        className="mt-4 inline-flex w-full justify-center rounded-md border px-4 py-2"
        onClick={handleSave}
      >
        Save &amp; continue
      </button>
    </div>
  );
}

export default TenYearDreamForm;
