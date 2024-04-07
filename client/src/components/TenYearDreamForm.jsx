import { useState } from "react";
import MicrophoneButton from "./MicrophoneButton";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

function TenYearDreamForm({ user }) {
  const [dreamText, setDreamText] = useState("");
  const [lastAppendedTranscript, setLastAppendedTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = event => {
    setDreamText(event.target.value);
  };

  const handleTranscript = transcript => {
    if (transcript.trim() !== lastAppendedTranscript.trim()) {
      console.log(transcript);
      setDreamText(transcript.trim());
      setLastAppendedTranscript(transcript);
    }
  };

  const handleSave = async () => {
    try {
      console.log("Saving dream:", dreamText);
      setIsLoading(true);
      await sendToClaude(dreamText);
      setIsLoading(false);
      navigate("/and-next");

      //Commented out code for testing loading!
      // setTimeout(() => {
      //   setIsLoading(false);
      //   navigate("/and-next");
      // }, 6000);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
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
      <Button onClick={handleSave}>save & continue</Button>
    </div>
  );
}

export default TenYearDreamForm;
