import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Login from '../../components/Login';

describe('Login Component', () => {
  it('renders login form', () => {
    render(
      <MemoryRouter>
        <Login handleLogin={() => {}} />
      </MemoryRouter>,
    );
    expect(screen.getByPlaceholderText('Gebruikersnaam')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Wachtwoord')).toBeInTheDocument();
  });

  it('displays login button', () => {
    render(
      <MemoryRouter>
        <Login handleLogin={() => {}} />
      </MemoryRouter>,
    );
    expect(screen.getByRole('button', { name: /sign in with microsoft/i })).toBeInTheDocument();
  });
});
