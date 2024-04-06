import React from "react";
import SelectableButton from "./SelectableButton";

const EntryDetails = ({ entry }) => {
  return (
    <div>
      <h3>Grateful For:</h3>
      {entry.gratefulFor.map((item, index) => (
        <SelectableButton
          key={`grateful-${index}`}
          initialText={item}
          onSelect={() => {}}
          onTextChange={() => {}}
          disabled={true}
        />
      ))}

      <h3>Daily Affirmations:</h3>
      {entry.dailyAffirmations.map((item, index) => (
        <SelectableButton
          key={`affirmation-${index}`}
          initialText={item}
          onSelect={() => {}}
          onTextChange={() => {}}
          disabled={true}
        />
      ))}

      <h3>Ultimate Affirmation:</h3>
      <SelectableButton
        initialText={entry.ultimateAffirmation}
        onSelect={() => {}}
        onTextChange={() => {}}
        disabled={true}
      />
    </div>
  );
};

export default EntryDetails;
