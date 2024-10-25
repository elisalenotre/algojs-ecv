import React, { useState } from 'react';
import { decryptPassword } from '../../utils/crypto/crypto';
import './message.css';

type Entry = {
  text: string;
  encryptedPassword: string;
  decryptedText: string;
  isDecrypted: boolean;
};

const Messages: React.FC<{ entries: Entry[], onDelete: (index: number) => void, onEdit: (index: number) => void }> = ({ entries, onDelete, onEdit }) => {
  const [unlockPassword, setUnlockPassword] = useState<string>('');

  const handleDecrypt = (index: number) => {
    const entry = entries[index];
    if (decryptPassword(entry.encryptedPassword) === unlockPassword) {
      entry.isDecrypted = true;
      entry.decryptedText = entry.text;
      setUnlockPassword('');
    }
  };

  return (
    <div className="messages">
      <h1>Mes Messages</h1>
      {entries.map((entry, index) => (
        <div key={index} className="entry">
          {entry.isDecrypted ? (
            <div>
              <p>{entry.decryptedText}</p>
              <button onClick={() => onEdit(index)}>Modifier</button>
              <button onClick={() => onDelete(index)}>Supprimer</button>
            </div>
          ) : (
            <div>
              <p>Texte caché - entrez le mot de passe pour déverrouiller</p>
              <input
                type="password"
                value={unlockPassword}
                onChange={(e) => setUnlockPassword(e.target.value)}
                placeholder="Mot de passe"
              />
              <button onClick={() => handleDecrypt(index)}>Déverrouiller</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Messages;
