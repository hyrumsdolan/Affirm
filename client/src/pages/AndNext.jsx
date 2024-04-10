import React, { useState, useEffect } from "react";
import { getClaudeResponse } from "../utils/callClaude";
import SelectableButton from "../components/SelectableButton";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import SpeakerButton from "../components/SpeakerButton";
import { useMutation } from "@apollo/client";
import { ADD_LITTLE_DREAMS } from "../utils/mutations";
import useUserNavigation from "../utils/userNavigation";

const REQUIRED_SELECTION_COUNT = 10;

let lastButtonHeight = "";
let buttonHeight = 0;
const AndNext = ({ user }) => {
  const [dreams, setDreams] = useState([]);
  const navigate = useNavigate();
  const [addLittleDreams] = useMutation(ADD_LITTLE_DREAMS);
  const [isLoading, setIsLoading] = useState(false);
  const handleMutationCompleted = useUserNavigation();
  const [buttonHeightUpdated, setButtonHeightUpdated] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(false);

  let longestDream = "";
  useEffect(() => {
    const fetchedDreams = getClaudeResponse();
    setDreams(
      fetchedDreams.map(dream => ({
        littleDream: dream,
        selected: false
      }))
    );
    fetchedDreams.forEach(dream => {
      if (dream.length > longestDream.length) longestDream = dream;
    });
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

    setButtonSize();
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

  const setButtonSize = () => {
    const allSelectableButtons = document.querySelectorAll(".selectableButton");

    allSelectableButtons.forEach(button => {
      if (lastButtonHeight !== "") {
        button.classList.replace(lastButtonHeight, "h-auto");
      }
    });

    allSelectableButtons.forEach(button => {
      if (button.children[0].textContent === longestDream) {
        buttonHeight = button.clientHeight;
      }
    });

    const heightClass = `h-[${buttonHeight}px]`;
    lastButtonHeight = heightClass;

    allSelectableButtons.forEach(button => {
      console.log(heightClass);
      button.classList.replace(
        lastButtonHeight !== "" ? "h-auto" : lastButtonHeight,
        heightClass
      );
    });
  };

  useEffect(() => {
    setTimeout(() => {
      // Set the buttons to be the same size on load
      setButtonSize();
      // On window resize, call the function to reset button size
      window.addEventListener("resize", setButtonSize, false);
    }, 0);

    setAnimationTrigger(true);
    const timer = setTimeout(() => {
      setAnimationTrigger(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [dreams]);

  const selectedCount = dreams.filter(dream => dream.selected).length;

  return (
    <div className="">
      <h1 className="mb-4 text-center text-4xl">...and next</h1>
      <div className="mx-5 text-center text-xs sm:text-sm md:mx-10 md:text-base">
        <span className="inline-flex items-center">
          <SpeakerButton audioSrc="https://res.cloudinary.com/dkonhzar9/video/upload/v1712649056/and-next-page-instructions_qurivq.mp3" />
        </span>
        <h2 className="mx-10 text-center">
          You've now envisioned your ideal future ten years from now. To make
          your dream more focused and actionable, it's crucial to identify the
          ten most significant elements that define your vision. I've summarized
          your dream into several bullet points using the past tense. Expressing
          your dreams and goals as if they have already been achieved can be
          incredibly empowering! Please choose the ten points that resonate with
          you the most.
        </h2>
      </div>
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
        Your future is BRIGHT! Scroll down to save & continue.
      </h2>
      <main className="grid grid-cols-1 justify-around gap-1 md:grid-cols-2 lg:grid-cols-3">
        {dreams.map((dream, index) => (
          <div className="m-10" key={index}>
            <SelectableButton
              className="selectableButton"
              id={index}
              initialText={dream.littleDream}
              onSelect={() => toggleDreamSelection(index)}
              canSelect={dream.canSelect !== false}
              selected={dream.selected}
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
          isEnabled={selectedCount === REQUIRED_SELECTION_COUNT}
          inputForDBSave={dreams
            .filter(dream => dream.selected)
            .map(dream => dream.littleDream)}
          onMutationCompleted={handleMutationCompleted}
        >
          save & continue
        </Button>
      </div>
    </div>
  );
};

export default AndNext;
