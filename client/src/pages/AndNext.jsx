import React, { useState, useEffect } from "react";
import { getClaudeResponse } from "../utils/callClaude";
import SelectableButton from "../components/SelectableButton";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useMutation } from "@apollo/client";
import { ADD_LITTLE_DREAMS } from "../utils/mutations";
import useUserNavigation from "../utils/userNavigation";

const REQUIRED_SELECTION_COUNT = 10;

const AndNext = ({ user }) => {
  const [dreams, setDreams] = useState([]);
  const navigate = useNavigate();
  const [addLittleDreams] = useMutation(ADD_LITTLE_DREAMS);
  const [isLoading, setIsLoading] = useState(false);
  const handleMutationCompleted = useUserNavigation();
  const [animationTrigger, setAnimationTrigger] = useState(false);

  useEffect(() => {
    const fetchedDreams = getClaudeResponse();
    setDreams(
      fetchedDreams.map(dream => ({ littleDream: dream, selected: false }))
    );
  }, []);

  const toggleDreamSelection = index => {
    setDreams(prevDreams => {
      const updatedDreams = [...prevDreams];
      updatedDreams[index].selected = !updatedDreams[index].selected;
      const selectedCount = updatedDreams.filter(
        dream => dream.selected
      ).length;
      if (selectedCount === REQUIRED_SELECTION_COUNT) {
        updatedDreams.forEach((dream, i) => {
          if (!dream.selected) {
            updatedDreams[i].canSelect = false;
          }
        });
      } else {
        updatedDreams.forEach((dream, i) => {
          updatedDreams[i].canSelect = true;
        });
      }
      return updatedDreams;
    });
  };


  const handleSave = async () => {
    try {
      setIsLoading(true);
      const selectedLittleDreams = dreams
        .filter(dream => dream.selected)
        .map(dream => dream.littleDream);
      await addLittleDreams({
        variables: {
          littleDreams: selectedLittleDreams
        }
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
    }
  };

  const selectedCount = dreams.filter(dream => dream.selected).length;

  useEffect(() => {
    setAnimationTrigger(true);
    const timer = setTimeout(() => {
      setAnimationTrigger(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [selectedCount]);

  return (
    <div className="">
      <h1 className="mb-4 text-center">...and next</h1>
      <h2 className="mx-10 text-center">
        Now, that you've painted your 10 year future, it's important to narrow
        your vision down to the 10 most important factors of your dream. It's
        important that you start thinking about your dream as if it has already
        happened! I've consolidated your dream down to several bullet points.
        Please select the TEN that matter the most to you.
      </h2>
      <h2
        className={`mt-4 text-center text-2xl ${animationTrigger ? "animate-jump" : ""}`}
      >
        Selected:{" "}
        <span
          className={
            selectedCount < REQUIRED_SELECTION_COUNT
              ? "font-bold text-red-500"
              : ""
          }
        >
          {selectedCount}
        </span>{" "}
        of {REQUIRED_SELECTION_COUNT}.{" "}
      </h2>
      <h2
        className={
          selectedCount < REQUIRED_SELECTION_COUNT
            ? "invisible mt-1 text-center text-2xl"
            : "visible mt-1 text-center text-2xl"
        }
      >
        Your future is BRIGHT!
      </h2>
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
        isEnabled={selectedCount === REQUIRED_SELECTION_COUNT}
        inputForDBSave={dreams
          .filter(dream => dream.selected)
          .map(dream => dream.littleDream)}
        onMutationCompleted={handleMutationCompleted}
      >
        save & continue
      </Button>
    </div>
  );
};

export default AndNext;
