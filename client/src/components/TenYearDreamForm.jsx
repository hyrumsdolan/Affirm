import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import MicrophoneButton from "./MicrophoneButton";
import Button from "./Button";
import { sendToClaude } from "../utils/callClaude";
import { useMutation } from "@apollo/client";
import { CALL_CLAUDE } from "../utils/mutations";
import ProgressSpinner from "./ProgressSpinner";
import useUserNavigation from "../utils/userNavigation";

function TenYearDreamForm({user}) {
  const [dreamText, setDreamText] = useState("");
  const [lastAppendedTranscript, setLastAppendedTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleMutationCompleted = useUserNavigation();
  const [callClaude] = useMutation(CALL_CLAUDE);
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

  const handleSave = async (event) => {
    event.preventDefault()
    console.log("Saving dream:", dreamText);
    try {
      setIsLoading(true);
      // const testresponse = await sendToClaude(dreamText);
      await callClaude({
        variables: dreamText
      })
      // await handleMutationCompleted();
      // setIsLoading(false);

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
    <>
      {isLoading ? (
        <div className="mt-10 flex h-full w-full flex-col items-center justify-center">
          <ProgressSpinner className="pointer-events-none mb-4 h-12 w-12" />
          <h2 className="text-center">
            Hang tight while we help shape your dream!
          </h2>
        </div>
      ) : (
        <form onSubmit={handleSave}>
          <div className="flex h-full flex-col">
            <div className="relative flex flex-grow">
              <textarea
                className="block w-full resize-none rounded-md border border-gray-300 px-3 py-2 shadow-sm transition-all duration-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 dark:text-zinc-900 sm:text-sm"
                value={dreamText}
                onChange={handleChange}
                placeholder="The best version of me is..."
              />
              <div className="absolute bottom-2 right-2">
                {/* <MicrophoneButton onTranscript={handleTranscript} /> */}
              </div>
            </div>

            <Button
              type="submit"
              className="mt-4 w-full"
              // user={user}
              // saveToUser="bigdream"
              // isEnabled={dreamText.length > 10}
              // inputForDBSave={dreamText}
            >
              save & continue
            </Button>
          </div>
        </form>
      )}
    </>
  );
}

export default TenYearDreamForm;
