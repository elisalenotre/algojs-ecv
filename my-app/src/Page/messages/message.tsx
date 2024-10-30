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
  const [showDeletePopup, setShowDeletePopup] = useState<boolean>(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);
  const [deletePassword, setDeletePassword] = useState<string>('');
  const [deleteError, setDeleteError] = useState<string>('');

  const handleDecrypt = (index: number) => {
    const entry = entries[index];
    if (decryptPassword(entry.encryptedPassword) === unlockPassword) {
      entry.isDecrypted = true;
      entry.decryptedText = entry.text;
      setUnlockPassword('');
    }
  };

  const handleShowDeletePopup = (index: number) => {
    setDeleteIndex(index);
    setShowDeletePopup(true);
    setDeletePassword('');
    setDeleteError('');
  };

  const handleConfirmDelete = () => {
    if (deleteIndex !== null) {
      const entry = entries[deleteIndex];
      if (decryptPassword(entry.encryptedPassword) === deletePassword) {
        onDelete(deleteIndex);
        setShowDeletePopup(false);
        setDeleteIndex(null);
      } else {
        setDeleteError('Mot de passe incorrect');
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeletePopup(false);
    setDeleteIndex(null);
    setDeletePassword('');
    setDeleteError('');
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
              <button onClick={() => handleShowDeletePopup(index)}>Supprimer</button>
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

      {showDeletePopup && (
        <div className="popup">
          <p>Êtes-vous sûr de vouloir supprimer ce message ?</p>
          <input
            type="password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            placeholder="Entrez le mot de passe pour confirmer"
          />
          {deleteError && <p className="error">{deleteError}</p>}
          <button onClick={handleConfirmDelete}>Confirmer</button>
          <button onClick={handleCancelDelete}>Annuler</button>
        </div>
      )}
    </div>
  );
};

export default Messages;
