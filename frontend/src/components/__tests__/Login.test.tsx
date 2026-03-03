import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Login from '../../Login';

describe('Login Component', () => {
  it('renders login form', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText('Gebruikersnaam')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Wachtwoord')).toBeInTheDocument();
  });

  it('displays login button', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });
});
