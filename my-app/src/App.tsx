import React, { useState } from 'react';
import Journal from './Page/journal/journal';
import Messages from './Page/messages/message';
import { Entry } from './types';

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const handleDelete = (index: number) => {
    setEntries(entries.filter((_, i) => i !== index));
  };

  const handleEdit = (index: number) => {
    setEditIndex(index);
  };

  const handleSaveEdit = (updatedEntry: Entry) => {
    if (editIndex !== null) {
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = updatedEntry;
      setEntries(updatedEntries);
      setEditIndex(null);
    }
  };

  return (
    <div>
      <Journal
        entries={entries}
        setEntries={setEntries}
        editIndex={editIndex}
        onSaveEdit={handleSaveEdit}
      />
      <Messages entries={entries} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default App;
