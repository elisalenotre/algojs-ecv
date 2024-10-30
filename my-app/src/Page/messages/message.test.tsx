import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Messages from './message';

const mockEntries = [
    {
        text: 'Message 1',
        encryptedPassword: 'encrypted1',
        decryptedText: '',
        isDecrypted: false,
    },
    {
        text: 'Message 2',
        encryptedPassword: 'encrypted2',
        decryptedText: '',
        isDecrypted: false,
    },
];

const mockOnDelete = jest.fn();
const mockOnEdit = jest.fn();

jest.mock('../../utils/crypto/crypto', () => ({
    decryptPassword: (password: string) => (password === 'encrypted1' ? 'password1' : 'password2'),
}));

describe('Messages Component', () => {
    beforeEach(() => {
        mockOnDelete.mockClear();
        mockOnEdit.mockClear();
    });

    test('renders messages correctly', () => {
        render(<Messages entries={mockEntries} onDelete={mockOnDelete} onEdit={mockOnEdit} />);
        
        expect(screen.getByText('Mes Messages')).toBeInTheDocument();
        expect(screen.getAllByText('Texte caché - entrez le mot de passe pour déverrouiller')).toHaveLength(2);
    });

    test('decrypts message with correct password', () => {
        render(<Messages entries={mockEntries} onDelete={mockOnDelete} onEdit={mockOnEdit} />);
        
        fireEvent.change(screen.getAllByPlaceholderText('Mot de passe')[0], { target: { value: 'password1' } });
        fireEvent.click(screen.getAllByText('Déverrouiller')[0]);
        
        expect(screen.getByText('Message 1')).toBeInTheDocument();
    });

    test('calls onEdit when edit button is clicked', () => {
        const decryptedEntries = [
            { ...mockEntries[0], isDecrypted: true, decryptedText: 'Message 1' },
            mockEntries[1],
        ];
        render(<Messages entries={decryptedEntries} onDelete={mockOnDelete} onEdit={mockOnEdit} />);
        
        fireEvent.click(screen.getAllByText('Modifier')[0]);
        
        expect(mockOnEdit).toHaveBeenCalledWith(0);
    });
});
