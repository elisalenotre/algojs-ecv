import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import './App.css';

type Entry = {
  text: string;
  encryptedPassword: string;
  decryptedText: string;
  isDecrypted: boolean;
};

const App: React.FC = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [newEntry, setNewEntry] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [unlockPassword, setUnlockPassword] = useState<string>('');

  const encryptPassword = (password: string) => CryptoJS.AES.encrypt(password, 'secret-key').toString();
  const decryptPassword = (ciphertext: string) => CryptoJS.AES.decrypt(ciphertext, 'secret-key').toString(CryptoJS.enc.Utf8);

  const handleAddEntry = () => {
    if (newEntry.trim()) setShowPasswordField(true);
  };

  const handleSaveEntry = () => {
    if (password.trim()) {
      const encryptedPassword = encryptPassword(password);
      const newEntryData = { text: newEntry, encryptedPassword, decryptedText: '', isDecrypted: false };
      setEntries([...entries, newEntryData]);
      setNewEntry('');
      setPassword('');
      setShowPasswordField(false);
    }
  };

  const handleDecrypt = (index: number) => {
    const entry = entries[index];
    if (decryptPassword(entry.encryptedPassword) === unlockPassword) {
      const updatedEntries = [...entries];
      updatedEntries[index].isDecrypted = true;
      updatedEntries[index].decryptedText = entry.text;
      setEntries(updatedEntries);
      setUnlockPassword('');
    }
  };

  const handleDeleteEntry = (index: number) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
  };

  const handleEditEntry = (index: number) => {
    setEditIndex(index);
    setNewEntry(entries[index].text);
    setShowPasswordField(true);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null && password.trim()) {
      const updatedEntries = [...entries];
      updatedEntries[editIndex] = {
        ...updatedEntries[editIndex],
        text: newEntry,
        encryptedPassword: encryptPassword(password),
        decryptedText: '',
        isDecrypted: false,
      };
      setEntries(updatedEntries);
      setEditIndex(null);
      setNewEntry('');
      setPassword('');
      setShowPasswordField(false);
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
        <button onClick={editIndex === null ? handleAddEntry : handleSaveEdit}>
          {editIndex === null ? 'Ajouter' : 'Sauvegarder'}
        </button>
        {showPasswordField && (
          <div className="password-field">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Entrez le mot de passe"
            />
            <button onClick={editIndex === null ? handleSaveEntry : handleSaveEdit}>
              Enregistrer
            </button>
          </div>
        )}
        <div className="entries">
          {entries.map((entry, index) => (
            <div key={index} className="entry">
              {entry.isDecrypted ? (
                <div className="entry-decrypted">
                  <p>{entry.decryptedText}</p>
                  <button onClick={() => handleEditEntry(index)} className="icon-button edit">✏️</button>
                  <button onClick={() => handleDeleteEntry(index)} className="icon-button delete">🗑️</button>
                </div>
              ) : (
                <div className="entry-encrypted">
                  <p>Texte caché - entrez le mot de passe pour déverrouiller</p>
                  <input
                    type="password"
                    value={unlockPassword}
                    onChange={(e) => setUnlockPassword(e.target.value)}
                    placeholder="Mot de passe"
                  />
                  <button onClick={() => handleDecrypt(index)} className="unlock-button">Déverrouiller</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;