import React, { useState } from "react";
import SelectableButton from "../components/SelectableButton";
import Button from "../components/Button";

const WelcomeBack = ({ user }) => {
  const [gratitudes, setGratitudes] = useState([
    "The weather was so beautiful today",
    "",
    "",
    "",
    "",
  ]);
  const [showLittleDreams, setShowLittleDreams] = useState(false);
  const littleDreams = user.dream?.littleDreams || [];
  const ultimateGoal = user.dream?.ultimateGoal || "";
  const littleDreamStrings = littleDreams.map(dream => dream.littleDream);

  const groupItems = (items, groupSize) => {
    let grouped = [];
    for (let i = 0; i < items.length; i += groupSize) {
      grouped.push(items.slice(i, i + groupSize));
    }
    return grouped;
  };

  const groupedDreams = groupItems(littleDreamStrings, 3);

  const handleGratitudeChange = (index, value) => {
    const updatedGratitudes = [...gratitudes];
    updatedGratitudes[index] = value;
    setGratitudes(updatedGratitudes);
  };

  const handleSave = () => {
    localStorage.setItem("gratitudes", JSON.stringify(gratitudes));
    console.log(JSON.parse(localStorage.getItem("gratitudes")));
    setShowLittleDreams(true);
  };

  const renderGratitudeInputs = gratitudes.map((gratitude, index) => (
    <div key={index}>
      <SelectableButton
        placeholderText="What are you grateful for today?"
        onTextChange={(value) => handleGratitudeChange(index, value)}
        editOnClick={true}
        showEditButton={false}
        selectIfInput={true}
      />
    </div>
  ));

  return (
    <>
      {!showLittleDreams ? (
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
            <Button className="m-auto" onClick={handleSave}>
              Save & Continue
            </Button>
          </footer>
        </>
      ) : (
        <>
          <header className="mb-8 text-center">
            <h1 className="mb-4 text-2xl">Your Little Dreams</h1>
          </header>
          <main className="">
            <div className="flex flex-col items-center">
              {groupedDreams.map((group, index) => (
                <div key={index} className="mb-4 flex justify-center gap-4">
                  {group.map((dream, index) => (
                    <div className="" key={index}>
                      <SelectableButton
                        initialText={dream}
                        canSelect={false}
                        startSelected={true}
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </main>
          <p className="text-lg text-center">Your Ultimate Goal:</p>
          <footer className="mt-8 mb-4 flex justify-center gap-4 ">
            <SelectableButton
              initialText={ultimateGoal}
              canSelect={false}
              startSelected={true}
            />
          </footer>
        </>
      )}
    </>
  );
};

export default WelcomeBack;