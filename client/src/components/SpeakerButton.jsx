// import { useSpeechSynthesis } from "react-speech-kit";
// import { HiOutlineSpeakerWave, HiStop } from "react-icons/hi2";
// import { useEffect } from "react";

// function SpeakerButton({ text }) {
//   const { speak, cancel, speaking, voices } = useSpeechSynthesis();

//   const handleClick = () => {
//     console.log(voices);
//     if (speaking) {
//       cancel();
//     } else {
//       speak({
//         text,
//         voice: voices[10]
//       });
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("visibilitychange", function () {
//       if (document.visibilityState === "hidden" && speaking) {
//         cancel();
//       }
//     });
//   }, []);

//   return (
//     <button
//       className="group rounded-full border-2 border-zinc-950 p-0.5 text-xl"
//       onClick={handleClick}
//     >
//       {speaking ? (
//         <HiStop className="group-hover:bg-black" />
//       ) : (
//         <HiOutlineSpeakerWave className="group-hover:bg-black" />
//       )}
//     </button>
//   );
// }

// export default SpeakerButton;
