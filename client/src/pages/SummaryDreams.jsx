import React, { useEffect, useState } from "react";
import { getClaudeResponse } from "../utils/callClaude";
import SelectableButton from "../components/SelectableButton";
import Button from "../components/Button";

const sampleDreams = [
  "Travel the world",
  "Learn to play the guitar",
  "Write a novel",
  "Start my own business",
  "Run a marathon",
  "Learn a new language",
  "Build my dream house",
  "Have a family",
  "Achieve financial independence",
  "Make a significant contribution to my community"
];

const SummaryDreams = ({user}) => {
  const [dreams, setDreams] = useState([]);
  const [coreDream, setCoreDream] = useState([]);


  const groupItems = (items, groupSize) => {
    let grouped = [];
    for (let i = 0; i < items.length; i += groupSize) {
      grouped.push(items.slice(i, i + groupSize));
    }
    return grouped;
  };

  // Using your dreams array
  const groupedDreams = groupItems(dreams, 3);

  useEffect(() => {
    console.log("summary user:", user);
  
    if (user) {
      console.log("user.me.dream:", user.dream);
      const littleDreams = user.dream.littleDreams;
      console.log("littleDreams:", littleDreams);
      const ultimateGoal = user.dream.ultimateGoal;
      console.log("ultimateGoal:", ultimateGoal);
      setDreams(littleDreams || sampleDreams);
      setCoreDream(ultimateGoal || []);
    }
  }, [user]);

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <header className="text-center">
        <h1 className="text-center text-4xl mb-5">you're breathtaking...</h1>
        <p className="text-center">
          Here is a summary of your dreams. Take a moment and soak up what your
          life will look like in ten years! You engineered this, we're going to
          help you get there.
        </p>
        <p className="mb-5 text-center">
          If you want to edit any of the entries, now is the time to do so. We
          will be affirming these dreams and goals every day moving forward!
          Click save & continue if you're ready to commit to your magnificent
          vision!
        </p>
      </header>

      <div className="flex flex-col items-center w-full px-4">
        <span className="text-lg font-bold mb-4">Who you are...</span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
          {dreams.slice(0, 9).map((dreamObj, index) => (
            <div key={index}>
              <SelectableButton
                width="w-full"
                initialText={dreamObj.littleDream}
                canSelect={false}
                startSelected={true}
              />
            </div>
          ))}
        </div>
        {dreams.length > 9 && (
          <div className="grid grid-cols-3 gap-4 w-full mt-4 ">
            <div className="col-start-2">
              <SelectableButton
                width="w-full"
                initialText={dreams[9].littleDream}
                canSelect={false}
                startSelected={true}
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center w-full px-4">
        <span className="text-lg font-bold">And the core goal...</span>
        {coreDream.length > 0 && (
          <div className="mt-4 flex justify-center">
            <SelectableButton
              width="w-full sm:w-96"
              initialText={coreDream}
              canSelect={false}
              startSelected={true}
            />
          </div>
        )}
      </div>

      <footer className="summary-footer mt-8 text-center">
        <Button className="m-auto" navigateTo="/welcome-back">
          save & continue
        </Button>
      </footer>
    </div>
  );
};

export default SummaryDreams;
