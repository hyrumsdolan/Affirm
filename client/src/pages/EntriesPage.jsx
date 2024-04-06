import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import SelectableButton from "../components/SelectableButton";
import EntryDetails from "../components/EntryDetails";

const EntriesPage = () => {
  const { loading, error, data } = useQuery(GET_ENTRY);
  const [selectedEntry, setSelectedEntry] = useState(null);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const entries = data?.entries || [];

  const handleEntryClick = entry => {
    if (selectedEntry === entry) {
      setSelectedEntry(null);
    } else {
      setSelectedEntry(entry);
    }
  };

  return (
    <div>
      <h1>My Entries</h1>
      {entries.map(entry => (
        <div key={entry._id}>
          <SelectableButton
            initialText={entry.createdAt}
            onSelect={() => handleEntryClick(entry)}
            onTextChange={() => {}}
          />
          {selectedEntry === entry && <EntryDetails entry={entry} />}
        </div>
      ))}
    </div>
  );
};

export default EntriesPage;
