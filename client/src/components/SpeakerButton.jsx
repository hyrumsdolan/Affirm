import { useState, useRef } from "react";
import { HiOutlineSpeakerWave, HiOutlinePauseCircle } from "react-icons/hi2";

function SpeakerButton() {
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
        {isPlaying ? <HiOutlinePauseCircle /> : <HiOutlineSpeakerWave />}
      </button>
      <audio ref={audioRef}>
        <source
          src="../assets/audio/ten-year-dream-prompt.mp3"
          type="audio/mpeg"
        />
        <source
          src="../assets/audio/ten-year-dream-prompt.ogg"
          type="audio/ogg"
        />
        <source
          src="../assets/audio/ten-year-dream-prompt.wav"
          type="audio/wav"
        />
        Your browser does not support the audio element.
      </audio>
    </>
  );
}

export default SpeakerButton;
