import React, { useState } from 'react';
import CryptoJS from 'crypto-js';

const App = () => {
  const [entries, setEntries] = useState<string[]>([]);
  const [newEntry, setNewEntry] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleAddEntry = () => {
    if (newEntry && password) {
      const encryptedEntry = CryptoJS.AES.encrypt(newEntry, password).toString();
      setEntries([...entries, encryptedEntry]);
      setNewEntry('');
      setPassword('');
    } else {
      alert('Veuillez saisir un mot de passe.');
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
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mot de passe"
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
};

export default App;