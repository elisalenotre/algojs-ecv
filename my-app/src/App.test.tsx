import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    test('renders Journal and Messages components', () => {
        render(<App />);
        expect(screen.getByText(/Journal/i)).toBeInTheDocument();
        expect(screen.getByText(/Messages/i)).toBeInTheDocument();
    });
});