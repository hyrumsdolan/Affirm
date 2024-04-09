import React, { useState, useEffect } from "react";
import SelectableButton from "../components/SelectableButton";
import Button from "../components/Button";

const WelcomeBack = ({ user }) => {
  const littleDreams = user.dream?.littleDreams || [];
  const [dailyAffirmations, setDailyAffirmations] = useState(
    littleDreams.map(dream => dream.littleDream)
  );
  const [ultimateGoal, setUltimateGoal] = useState(
    user.dream?.ultimateGoal || ""
  );
  const [showLittleDreams, setShowLittleDreams] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [gratitudes, setGratitudes] = useState(["", "", "", "", ""]);
  const userName = user.firstName;

  const groupItems = (items, groupSize) => {
    let grouped = [];
    for (let i = 0; i < items.length; i += groupSize) {
      grouped.push(items.slice(i, i + groupSize));
    }
    return grouped;
  };

  const groupedDreams = groupItems(dailyAffirmations, 2);

  const handleGratitudeChange = (index, value) => {
    const updatedGratitudes = [...gratitudes];
    updatedGratitudes[index] = value;
    setGratitudes(updatedGratitudes);
  };

  const handleAffirmationChange = (index, value) => {
    const updatedAffirmations = [...dailyAffirmations];
    updatedAffirmations[index] = value;
    setDailyAffirmations(updatedAffirmations);
  };

  const handleUltimateChange = value => {
    setUltimateGoal(value);
  };

  const handleFocus = index => {
    setFocusedIndex(index);
  };

  const handleSave = () => {
    if (!showLittleDreams) {
      setShowLittleDreams(true);
    } else {
      const entryData = {
        gratefulFor: gratitudes,
        dailyAffirmations: dailyAffirmations,
        ultimateAffirmation: ultimateGoal
      };
      // console.log("Entry Data:", entryData);
      // Call the mutation to create the entry
    }
  };

  const renderGratitudeInputs = gratitudes.map((gratitude, index) => (
    <div key={index}>
      <SelectableButton
        placeholderText="What are you grateful for today?"
        onTextChange={value => handleGratitudeChange(index, value)}
        editOnClick={true}
        showEditButton={false}
        selectIfInput={true}
        focused={focusedIndex === index}
        onFocus={() => handleFocus(index)}
        onSubmit={() => handleFocus(index + 1)}
      />
    </div>
  ));

  return (
    <>
      {!showLittleDreams ? (
        <>
          <header className="mb-8 text-center">
            <h1 className="mb-4 text-2xl">Welcome back, {userName} :)</h1>
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
                        canSelect={true}
                        startSelected={false}
                        onTextChange={value =>
                          handleAffirmationChange(index, value)
                        }
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </main>
          <p className="text-center text-lg">Your Ultimate Goal:</p>
          <footer className="mb-4 mt-8 flex flex-col justify-center gap-4">
            <SelectableButton
              className="m-auto"
              initialText={ultimateGoal}
              canSelect={true}
              startSelected={false}
              onTextChange={handleUltimateChange}
            />

            <Button
              className="m-auto"
              onClick={handleSave}
              saveToUser="entry"
              inputForDBSave={{
                gratefulFor: gratitudes,
                dailyAffirmations: dailyAffirmations,
                ultimateAffirmation: ultimateGoal
              }}
              navigateTo="/confirmation"
              user={user}
            >
              Save & Continue
            </Button>
          </footer>
        </>
      )}
    </>
  );
};

export default WelcomeBack;
