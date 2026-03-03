import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import HomePage from '../../HomePage';

describe('HomePage', () => {
  it('renders product categories', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    expect(screen.getByText('T-shirts')).toBeInTheDocument();
    expect(screen.getByText('Hoodies')).toBeInTheDocument();
  });
});
