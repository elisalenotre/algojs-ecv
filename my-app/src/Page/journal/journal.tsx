import React, { useState, useEffect } from 'react';
import { encryptPassword } from '../../utils/crypto/crypto';
import './journal.css';
import { Entry } from '../../types';    

type JournalProps = {
  entries: Entry[];
  setEntries: React.Dispatch<React.SetStateAction<Entry[]>>;
  editIndex: number | null;
  onSaveEdit: (updatedEntry: Entry) => void;
};

const Journal: React.FC<JournalProps> = ({ entries, setEntries, editIndex, onSaveEdit }) => {
  const [newEntry, setNewEntry] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPasswordField, setShowPasswordField] = useState<boolean>(false);

  useEffect(() => {
    if (editIndex !== null) {
      setNewEntry(entries[editIndex].text);
      setShowPasswordField(true);
    }
  }, [editIndex, entries]);

  const handleAddEntry = () => {
    if (newEntry.trim()) setShowPasswordField(true);
  };

  const handleSaveEntry = () => {
    if (password.trim()) {
      const encryptedPassword = encryptPassword(password);
      const newEntryData = { text: newEntry, encryptedPassword, decryptedText: '', isDecrypted: false };

      console.log("Hash du mot de passe (brut):", encryptedPassword);
      console.log("Informations sur le message envoyé:", {
        texte: newEntry,
        hash: encryptedPassword,
        date: new Date().toISOString(),
      });

      if (editIndex !== null) {
        onSaveEdit(newEntryData);
      } else {
        setEntries([...entries, newEntryData]);
      }

      setNewEntry('');
      setPassword('');
      setShowPasswordField(false);
    }
  };

  return (
    <div className="journal">
      <h1>Journal Intime</h1>
      <textarea
        value={newEntry}
        onChange={(e) => setNewEntry(e.target.value)}
        placeholder="Écris quelque chose..."
      />
      <button onClick={handleAddEntry}>{editIndex !== null ? 'Modifier' : 'Ajouter'}</button>
      {showPasswordField && (
        <div className="password-field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Entrez le mot de passe"
          />
          <button onClick={handleSaveEntry}>{editIndex !== null ? 'Enregistrer les modifications' : 'Enregistrer'}</button>
        </div>
      )}
    </div>
  );
};

export default Journal;
