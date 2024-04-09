import React, { useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import useUserNavigation from "../utils/userNavigation";

const OneGoal = () => {
  const [goal, setGoal] = useState("");

  const handleInputChange = event => {
    setGoal(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Goal:", goal);
    if (!goal) {
      console.log("Goal is empty");
      return;
    }
    console.log("Submitted goal:", goal);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <header className="app-header"></header>
      <main className="main-content">
        <h1 className="mb-4 text-center">One goal to rule them all</h1>
        <h2 className="m-10 text-center">
          Even though you are more focused now with these ten dreams, you're
          still thinking too broadly. We've got to narrow it down to one goal
          for THIS YEAR.
        </h2>
        <h2 className="m-10 text-center">
          Identify a single, quantifiable action you can take that will propel
          you towards becoming the person you aspire to be a decade from now.
          What step can you implement immediately to accelerate your progress on
          this transformative journey?
        </h2>
        <div className="flex flex-col items-center">
          <InputBox
            type="text"
            value={goal}
            onChange={handleInputChange}
            placeholder="Enter your goal"
            className="goal-input mb-4 h-12 w-3/4 px-4 py-2"
          />
          <Button
            onClick={handleSubmit}
            className="submit-button"
            inputForDBSave={goal}
            isEnabled={goal}
            saveToUser="ultimategoal"
            navigateTo="/summary-dreams-page"
          >
            save & continue
          </Button>
        </div>
      </main>
    </div>
  );
};

export default OneGoal;
