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
  const [buttonHeightUpdated, setButtonHeightUpdated] = useState(false);

  let longestDream = "";
  useEffect(() => {
    const fetchedDreams = getClaudeResponse(); // Core dream is last element
    setDreams(fetchedDreams);

    fetchedDreams.forEach(dream => {
      if (dream.length > longestDream.length) longestDream = dream;
    });
  }, []);

  const toggleDreamSelection = (dream, isSelected) => {
    setSelectedDreams(prevSelected => ({
      ...prevSelected,
      [dream]: isSelected
    }));
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      // const selectedDreamsArray = Object.keys(selectedDreams).filter(
      //   dream => selectedDreams[dream]
      // );
      // await addLittleDreams({
      //   variables: { littleDreams: selectedDreamsArray }
      // });
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  let lastButtonHeight = "";
  const setButtonSize = () => {
    const allSelectableButtons = document.querySelectorAll(".selectableButton");

    allSelectableButtons.forEach(button => {
      if (lastButtonHeight != "") {
        button.classList.replace(lastButtonHeight, "h-auto");
      }
    });

    let buttonHeight = 0;
    allSelectableButtons.forEach(button => {
      if (button.children[0].textContent === longestDream) {
        buttonHeight = button.clientHeight;
      }
    });

    const heightClass = `h-[${buttonHeight}px]`;
    lastButtonHeight = heightClass;
    allSelectableButtons.forEach(button => {
      button.classList.replace(
        lastButtonHeight != "" ? "h-auto" : lastButtonHeight,
        heightClass
      );
    });
  };

  useEffect(() => {
    setTimeout(() => {
      //Set the buttons to be the same size on load
      setButtonSize();
      //On window resize, call the function to reset button size
      window.addEventListener("resize", setButtonSize, false);
    }, 0);
  }, []);

  return (
    <div className="">
      <main className="grid grid-cols-1 justify-around gap-1 md:grid-cols-2 lg:grid-cols-3">
        {dreams.map((dream, index) => (
          <div className="m-10" key={index}>
            <SelectableButton
              className="selectableButton"
              id={index}
              initialText={dream}
              onSelect={isSelected => toggleDreamSelection(dream, isSelected)}
            />
          </div>
        ))}
      </main>
      <div className="flex w-screen justify-end">
        <Button
          onClick={handleSave}
          className="bottom-10 left-0 m-10"
          user={user}
          saveToUser="littledreams"
          isEnabled={Object.values(selectedDreams).some(
            isSelected => isSelected
          )}
          inputForDBSave={Object.keys(selectedDreams).filter(
            dream => selectedDreams[dream]
          )}
          onMutationCompleted={handleMutationCompleted}
        >
          save & continue
        </Button>
      </div>
    </div>
  );
};

export default AndNext;
