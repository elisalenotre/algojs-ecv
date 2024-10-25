import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import { FaTrash, FaEdit, FaLockOpen } from 'react-icons/fa';

const App = () => {
  const [entries, setEntries] = useState<string[]>([]);
  const [newEntry, setNewEntry] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleAddEntry = () => {
    if (newEntry && password) {
      const encryptedEntry = CryptoJS.AES.encrypt(newEntry, password).toString();
      if (editingIndex !== null) {
        const updatedEntries = [...entries];
        updatedEntries[editingIndex] = encryptedEntry;
        setEntries(updatedEntries);
        setEditingIndex(null);
      } else {
        setEntries([...entries, encryptedEntry]);
      }
      setNewEntry('');
      setPassword('');
    } else {
      alert('Veuillez saisir un mot de passe.');
    }
  };

  const handleDecryptEntry = (index: number) => {
    const decryptedEntry = CryptoJS.AES.decrypt(entries[index], password).toString(CryptoJS.enc.Utf8);
    if (decryptedEntry) {
      alert(`Message décrypté: ${decryptedEntry}`);
    } else {
      alert('Mot de passe incorrect.');
    }
  };

  const handleDeleteEntry = (index: number) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handleEditEntry = (index: number) => {
    const decryptedEntry = CryptoJS.AES.decrypt(entries[index], password).toString(CryptoJS.enc.Utf8);
    if (decryptedEntry) {
      setNewEntry(decryptedEntry);
      setEditingIndex(index);
    } else {
      alert('Mot de passe incorrect.');
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
        <button onClick={handleAddEntry}>{editingIndex !== null ? 'Modifier' : 'Ajouter'}</button>
        <div className="entries">
          {entries.map((entry, index) => (
            <div key={index} className="entry">
              <span>{entry}</span>
              <FaLockOpen onClick={() => handleDecryptEntry(index)} />
              <FaEdit onClick={() => handleEditEntry(index)} />
              <FaTrash onClick={() => handleDeleteEntry(index)} />
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;