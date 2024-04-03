import { useSpeechSynthesis } from 'react-speech-kit';
import { HiOutlineSpeakerWave, HiStop } from "react-icons/hi2";


function SpeakerButton({ text }) {
    const { speak, cancel, speaking } = useSpeechSynthesis();

    const handleClick = () => {
        if (speaking) {
            cancel();
        } else {
            speak({ text });
        }
    };

    return (
        <button
            className="inline-flex items-center text-sm leading-4 font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150 speaker-button"
            onClick={handleClick}
        >
            {speaking ? <HiStop/> : <HiOutlineSpeakerWave/>}
        </button>
    );
}

export default SpeakerButton;