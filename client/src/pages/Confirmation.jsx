import React from "react";
import Button from "../components/Button";

const Confirmation = () => {
  const messages = [
    "You're all set!",
    "You're on your way!",
    "Way to go!",
    "Phenomenal!",
    "Excellent!",
    "Perfecto!",
    "Great job!",
    "Perfect!",
    "Love it!",
    "Lovely <3!",
    "You're doing amazing!",
    "You're on fire!",
    "Well done!",
    "You're killing it!",
    "You're a star!",
    "You're a rockstar!",
    "You're a superstar!"
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="mb-4 text-center text-4xl">{randomMessage}</h1>
      <h2 className="text-2xl">See you again tomorrow!</h2>
      <Button 
      className="mt-8" 
      navigateTo="/welcome-back"
      >Go Back and Update</Button>
    </div>
  );
};

export default Confirmation;
