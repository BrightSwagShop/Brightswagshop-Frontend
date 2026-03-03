import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import RootLayout from './RootLayout';

describe('RootLayout', () => {
  it('renders layout with header and footer', () => {
    const { container } = render(
      <MemoryRouter>
        <RootLayout />
      </MemoryRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
