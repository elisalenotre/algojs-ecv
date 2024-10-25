import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Journal from './journal';
import { encryptPassword } from '../../utils/crypto/crypto';
import { Entry } from '../../types';

jest.mock('../../utils/crypto/crypto');

const mockEncryptPassword = encryptPassword as jest.MockedFunction<typeof encryptPassword>;

describe('Journal Component', () => {
  const mockEntries: Entry[] = [];
  const mockSetEntries = jest.fn();
  const mockOnSaveEdit = jest.fn();

  beforeEach(() => {
    mockEncryptPassword.mockReturnValue('mockedEncryptedPassword');
  });

  test('renders Journal component', () => {
    render(
      <Journal
        entries={mockEntries}
        setEntries={mockSetEntries}
        editIndex={null}
        onSaveEdit={mockOnSaveEdit}
      />
    );
    expect(screen.getByText('Journal Intime')).toBeInTheDocument();
  });

  test('adds a new entry', () => {
    render(
      <Journal
        entries={mockEntries}
        setEntries={mockSetEntries}
        editIndex={null}
        onSaveEdit={mockOnSaveEdit}
      />
    );

    const textarea = screen.getByPlaceholderText('Écris quelque chose...');
    fireEvent.change(textarea, { target: { value: 'New Entry' } });

    const addButton = screen.getByText('Ajouter');
    fireEvent.click(addButton);

    expect(screen.getByPlaceholderText('Entrez le mot de passe')).toBeInTheDocument();
  });

  test('saves a new entry with password', () => {
    render(
      <Journal
        entries={mockEntries}
        setEntries={mockSetEntries}
        editIndex={null}
        onSaveEdit={mockOnSaveEdit}
      />
    );

    const textarea = screen.getByPlaceholderText('Écris quelque chose...');
    fireEvent.change(textarea, { target: { value: 'New Entry' } });

    const addButton = screen.getByText('Ajouter');
    fireEvent.click(addButton);

    const passwordInput = screen.getByPlaceholderText('Entrez le mot de passe');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const saveButton = screen.getByText('Enregistrer');
    fireEvent.click(saveButton);

    expect(mockSetEntries).toHaveBeenCalledWith([
      {
        text: 'New Entry',
        encryptedPassword: 'mockedEncryptedPassword',
        decryptedText: '',
        isDecrypted: false,
      },
    ]);
  });

  test('edits an existing entry', () => {
    const existingEntries: Entry[] = [{ text: 'Existing Entry', encryptedPassword: 'oldPassword', decryptedText: '', isDecrypted: false }];
    render(
      <Journal
        entries={existingEntries}
        setEntries={mockSetEntries}
        editIndex={0}
        onSaveEdit={mockOnSaveEdit}
      />
    );

    const textarea = screen.getByPlaceholderText('Écris quelque chose...');
    expect(textarea).toHaveValue('Existing Entry');

    fireEvent.change(textarea, { target: { value: 'Updated Entry' } });

    const passwordInput = screen.getByPlaceholderText('Entrez le mot de passe');
    fireEvent.change(passwordInput, { target: { value: 'newPassword123' } });

    const saveButton = screen.getByText('Enregistrer les modifications');
    fireEvent.click(saveButton);

    expect(mockOnSaveEdit).toHaveBeenCalledWith({
      text: 'Updated Entry',
      encryptedPassword: 'mockedEncryptedPassword',
      decryptedText: '',
      isDecrypted: false,
    });
  });
});