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

const SummaryDreams = ({ user }) => {
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
    <div className="flex h-auto min-h-screen flex-col items-center justify-center transition-all duration-300 dark:bg-zinc-900 dark:text-white">
      <header className="mb-8 text-center">
        <h1 className="mb-4 text-center text-4xl">you're breathtaking...</h1>
        <p className="m-10 text-center">
          Here is a summary of your dreams. Take a moment and soak up what your
          life will look like in ten years! You engineered this, we're going to
          help you get there.
        </p>
        <p className="m-10 text-center">
          {" "}
          If you want to edit any of the entries, now is the time to do so. We
          will be affirming these dreams and goals every day moving forward!
          Click save & continue if you're ready to commit to your magnificient
          vision!
        </p>
      </header>

      <div className="flex flex-col items-center">
        <span className="text-lg font-bold">Who you are...</span>
        {groupedDreams.map((group, index) => (
          <div key={index} className="mb-4 flex justify-center gap-4">
            {group.map((dreamObj, index) => (
              <div className="" key={index}>
                <SelectableButton
                  initialText={dreamObj.littleDream}
                  canSelect={false}
                  startSelected={true}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center ">
        <span className="text-lg font-bold">And the core goal...</span>
        {coreDream.length > 0 && (
          <div className="mt-4 flex justify-center">
            <SelectableButton
              initialText={"test"}
              canSelect={false}
              startSelected={true}
            />
          </div>
        )}
      </div>

      <footer className="summary-footer mt-8 text-center">
        <Button className="m-auto mb-10" navigateTo="/welcome-back">
          save & continue
        </Button>
      </footer>
    </div>
  );
};

export default SummaryDreams;
