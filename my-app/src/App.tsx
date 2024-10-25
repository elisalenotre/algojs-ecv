import React, { useState } from 'react';
import './App.css';

function App() {
  const [entries, setEntries] = useState<string[]>([]);
  const [newEntry, setNewEntry] = useState<string>('');

  const handleAddEntry = () => {
    if (newEntry.trim()) {
      setEntries([...entries, newEntry]);
      setNewEntry('');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Mon Journal Intime</h1>
        <textarea
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          placeholder="Écris quelque chose..."
        />
        <button onClick={handleAddEntry}>Ajouter</button>
        <div className="entries">
          {entries.map((entry, index) => (
            <div key={index} className="entry">
              {entry}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;