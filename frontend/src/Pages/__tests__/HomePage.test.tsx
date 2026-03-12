import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import HomePage from '../HomePage';

describe('HomePage', () => {
  it('renders product categories', async () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(await screen.getByText('BrightSwagShop')).toBeInTheDocument();
    expect(await screen.getByText('Hoodie')).toBeInTheDocument();
  });
});
