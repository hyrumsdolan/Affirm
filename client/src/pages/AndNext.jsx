import React, { useState, useEffect } from "react";
import { getClaudeResponse } from "../utils/callClaude";
import SelectableButton from "../components/SelectableButton";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useMutation } from "@apollo/client";
import { ADD_LITTLE_DREAMS } from "../utils/mutations";

const AndNext = () => {
  const [selectedDreams, setSelectedDreams] = useState({});
  const [dreams, setDreams] = useState([]);
  const navigate = useNavigate();
  const [addLittleDreams] = useMutation(ADD_LITTLE_DREAMS);

  useEffect(() => {
    const fetchedDreams = getClaudeResponse(0, -1); // Core dream is last element
    setDreams(fetchedDreams);
  }, []);

  const toggleDreamSelection = (dream, isSelected) => {
    setSelectedDreams(prevSelected => ({
      ...prevSelected,
      [dream]: isSelected
    }));
  };

  const handleSave = async () => {
    try {
      const selectedDreamsArray = Object.keys(selectedDreams).filter(
        dream => selectedDreams[dream]
      );
      await addLittleDreams({
        variables: { littleDreams: selectedDreamsArray }
      });
      navigate("/summary-dreams-page");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="">
      <main className="grid grid-cols-1 justify-around gap-1 md:grid-cols-2 lg:grid-cols-3">
        {dreams.map((dream, index) => (
          <div className="m-10" key={index}>
            <SelectableButton
              initialText={dream}
              disabled={selectedDreams[dream]}
              onSelect={isSelected => toggleDreamSelection(dream, isSelected)}
            />
          </div>
        ))}
      </main>
      <Button
        onClick={handleSave}
        className="r-0 absolute right-0 m-10"
        navigateTo="/and-next"
      >
        save & continue
      </Button>
    </div>
  );
};

export default AndNext;
