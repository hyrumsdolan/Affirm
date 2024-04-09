import React, { useState, useEffect } from "react";
import { getClaudeResponse } from "../utils/callClaude";
import SelectableButton from "../components/SelectableButton";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useMutation } from "@apollo/client";
import { ADD_LITTLE_DREAMS } from "../utils/mutations";
import useUserNavigation from "../utils/userNavigation";

const AndNext = ({ user }) => {
  const [selectedDreams, setSelectedDreams] = useState({});
  const [dreams, setDreams] = useState([]);
  const navigate = useNavigate();
  const [addLittleDreams] = useMutation(ADD_LITTLE_DREAMS);
  const [isLoading, setIsLoading] = useState(false);
  const handleMutationCompleted = useUserNavigation();
  const MAX_SELECTIONS = 10;

  useEffect(() => {
    const fetchedDreams = getClaudeResponse();
    // Core dream is last element
    setDreams(fetchedDreams);
  }, []);

  const toggleDreamSelection = (dream, isSelected) => {
    const selectedCount = Object.values(selectedDreams).filter(Boolean).length;

    if (isSelected && selectedCount >= MAX_SELECTIONS) {
      return;
    }

    setSelectedDreams(prevSelected => {
      const updatedSelections = { ...prevSelected, [dream]: isSelected };

      if (
        Object.values(updatedSelections).filter(Boolean).length ===
        MAX_SELECTIONS
      ) {
        Object.keys(updatedSelections).forEach(key => {
          if (!updatedSelections[key]) {
            updatedSelections[key] = false;
          }
        });
      }

      return updatedSelections;
    });
  };


  const handleSave = async () => {
    const selectedCount = Object.values(selectedDreams).filter(Boolean).length;

    if (selectedCount < MAX_SELECTIONS) {
      alert(`Please select ${MAX_SELECTIONS} items before saving.`);
      return;
    }

    try {
      setIsLoading(true);
      await addLittleDreams({
        variables: {
          littleDreams: Object.keys(selectedDreams).filter(
            dream => selectedDreams[dream]
          )
        }
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const selectedCount = Object.values(selectedDreams).filter(Boolean).length;

  return (
    <div className="">
      <h1>Now choose the ten most important parts of your dream!</h1>
      <p>
        It's important that you start thinking about your dream as if it has
        already happened! I have summarized your dream into bullet points in
        past tense. Now choose which 10 are the most important to you!
      </p>
      <p>
        Selected: {selectedCount} out of {MAX_SELECTIONS}
      </p>
      <main className="grid grid-cols-1 justify-around gap-1 md:grid-cols-2 lg:grid-cols-3">
        {dreams.map((dream, index) => (
          <div className="m-10" key={index}>
            <SelectableButton
            
              initialText={dream}
              onSelect={isSelected => toggleDreamSelection(dream, isSelected)}
              canSelect={
                selectedDreams[dream] ||
                Object.values(selectedDreams).filter(Boolean).length <
                  MAX_SELECTIONS
              }
            />
          </div>
        ))}
      </main>
      <Button
        onClick={handleSave}
        className="r-0 absolute right-0 m-10"
        user={user}
        saveToUser="littledreams"
        isEnabled={
          Object.values(selectedDreams).filter(Boolean).length ===
          MAX_SELECTIONS
        }
        inputForDBSave={Object.keys(selectedDreams).filter(
          dream => selectedDreams[dream]
        )}
        onMutationCompleted={handleMutationCompleted}
      >
        save & continue
      </Button>
    </div>
  );
};

export default AndNext;
