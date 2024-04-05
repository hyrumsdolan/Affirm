import { useSpeechSynthesis } from "react-speech-kit";
import { HiOutlineSpeakerWave, HiStop } from "react-icons/hi2";
import { useEffect, useState } from "react";

function SpeakerButton({ text }) {
  const { speak, cancel, speaking, voices } = useSpeechSynthesis();

  const [voiceNum, setVoiceNum] = useState(0);

  const handleClick = () => {
    console.log(voices);
    if (speaking) {
      cancel();
    } else {
      speak({
        text,
        voice: voices[voiceNum]
      });
    }
  };

  useEffect(() => {
    window.addEventListener("visibilitychange", function () {
      if (document.visibilityState === "hidden" && speaking) {
        cancel();
      }
    });
  }, []);

  return (
    <>
      <button
        className={`group rounded-full border-zinc-950 p-0.5 text-xl transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 ${speaking ? "bg-zinc-100 dark:bg-zinc-800" : ""}`}
        onClick={handleClick}
      >
        {speaking ? <HiStop /> : <HiOutlineSpeakerWave />}
      </button>

      {/* <button
        onClick={() => {
          setVoiceNum(voiceNum + 1);
        }}
      >
        Go to next voice
      </button> */}
    </>
  );
}

export default SpeakerButton;
