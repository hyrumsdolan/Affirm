import { useState, useRef } from "react";
import { HiOutlineSpeakerWave, HiOutlinePause } from "react-icons/hi2";

function SpeakerButton({ audioSrc }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleClick = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(error => {
          console.error("Failed to play audio:", error);
          alert(
            "Audio playback failed. Please check your browser settings and ensure audio playback is allowed."
          );
          setIsPlaying(false);
        });
    }
  };

  return (
    <>
      <button
        className="group rounded-full border-2 border-zinc-950 p-0.5 text-xl"
        onClick={handleClick}
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
      >
        {isPlaying ? <HiOutlinePause /> : <HiOutlineSpeakerWave />}
      </button>
      <audio ref={audioRef}>
        <source src={audioSrc} type="audio/mpeg" />
      </audio>
    </>
  );
}

export default SpeakerButton;
