import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { encryptPassword, decryptPassword } from './crypto';

describe('crypto utility functions', () => {
    const password = 'mySecretPassword';
    let encryptedPassword: string;

    test('encryptPassword should encrypt the password', () => {
        encryptedPassword = encryptPassword(password);
        expect(encryptedPassword).not.toBe(password);
        expect(encryptedPassword).toBeTruthy();
    });

    test('decryptPassword should decrypt the encrypted password', () => {
        const decryptedPassword = decryptPassword(encryptedPassword);
        expect(decryptedPassword).toBe(password);
    });

    test('decryptPassword should return an empty string for invalid ciphertext', () => {
        const decryptedPassword = decryptPassword('invalid-ciphertext');
        expect(decryptedPassword).toBe('');
    });
});