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
    <div className="flex w-full items-center justify-center" key={index}>
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
            <h1 className="mb-4 text-center text-4xl">
              welcome back, {userName} :)
            </h1>
            <p className="text-lg">Frist, let's express some gratitude.</p>
            <p className="text-lg">
              Expand your gratitude. Mention 5 unique things that you didn't
              list yesterday.
            </p>
          </header>
          <main className="flex items-center justify-center">
            <div className="flex w-3/4 flex-col items-center justify-center gap-4 md:w-1/2">
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
            <h1 className="mb-4 text-center text-4xl">
              Now it's time to{" "}
              <span style={{ fontFamily: "liSongPro", color: "#819EC9" }}>
                affirm
              </span>{" "}
              your vision.
            </h1>
            <p className="text-lg">
              Writing WHO YOU ARE and your CORE GOAL every day reminds you to
              keep on track. You've got this!
            </p>
            <p className="text-lg">
              Read them out loud as you select them and feel yourself move
              toward your vision.
            </p>
          </header>
          <main className="">
            <div className="flex w-full flex-col items-center px-4">
              <p className="mb-4 text-center text-lg">Who You Are:</p>
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {dailyAffirmations.slice(0, 9).map((dream, index) => (
                  <div key={index}>
                    <SelectableButton
                      width="w-full"
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
              {dailyAffirmations.length > 9 && (
                <div className="mt-4 grid w-full grid-cols-3 gap-4">
                  <div className="col-start-2">
                    <SelectableButton
                      width="w-full"
                      initialText={dailyAffirmations[9]}
                      canSelect={true}
                      startSelected={false}
                      onTextChange={value => handleAffirmationChange(9, value)}
                    />
                  </div>
                </div>
              )}
            </div>
          </main>

          <footer className="mb-4 mt-8 flex w-full flex-col items-center justify-center gap-4 px-4">
            <p className="text-center text-lg">Your Core Goal:</p>
            <SelectableButton
              className=""
              width="w-3/4 md:w-1/2"
              initialText={ultimateGoal}
              canSelect={true}
              startSelected={false}
              onTextChange={handleUltimateChange}
            />

            <Button
              className="m-auto mb-10"
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
