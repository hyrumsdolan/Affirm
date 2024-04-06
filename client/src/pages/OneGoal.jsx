import React, { useState } from "react";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const OneGoal = () => {
  const [goal, setGoal] = useState("");
  const navigate = useNavigate();

  const handleInputChange = event => {
    setGoal(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Goal:", goal);
    if (!goal) {
      console.log("Goal is empty");
      return;
    }
    navigate("/summary-dreams-page");
    console.log("Submitted goal:", goal);
  };

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <header className="app-header"></header>
      <main className="main-content">
        <h1 className="mb-4">One goal to rule them all</h1>
        <h2 className="mb-4 text-center">
          If you could only have one goal. One guiding light. What would it be?
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
            saveToUser="ultimateGoal"
          >
            save & continue
          </Button>
        </div>
      </main>
    </div>
  );
};

export default OneGoal;
