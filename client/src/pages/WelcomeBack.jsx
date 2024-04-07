import React, { useState } from "react";
import SelectableButton from "../components/SelectableButton";
import Button from "../components/Button";

const WelcomeBack = () => {
  const [gratitudes, setGratitudes] = useState([
    "The weather was so beautiful today",
    "",
    "",
    "",
    ""
  ]);

  const handleGratitudeChange = (index, value) => {
    const updatedGratitudes = [...gratitudes];
    updatedGratitudes[index] = value;
    setGratitudes(updatedGratitudes);
  };

  const renderGratitudeInputs = gratitudes.map((gratitude, index) => (
    <div key={index}>
      <SelectableButton
        placeholderText = "What are you grateful for today?"
        onTextChange={(value) => handleGratitudeChange(index, value)}
        disabled={false}
      />
    </div>
  ));

  return (
    <>
      <header className="mb-8 text-center">
        <h1 className="mb-4 text-2xl">Welcome back :)</h1>
        <p className="text-lg">Let's express some gratitude.</p>
      </header>
      <main className="">
        <div className="flex flex-col items-center gap-4">
          {renderGratitudeInputs}
        </div>
      </main>
      <footer className="welcome-footer mt-8 text-center">
<<<<<<< HEAD
        <Button className="m-auto" navigateTo="/come-back-tomorrow">
          save & continue
=======
        <Button className="m-auto" navigateTo="/little-dreams">
          Save & Continue
>>>>>>> d300ade (changes in progress)
        </Button>
      </footer>
    </>
  );
};

export default WelcomeBack;