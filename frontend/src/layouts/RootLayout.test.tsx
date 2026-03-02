import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import RootLayout from './RootLayout';

describe('RootLayout', () => {
  it('renders layout with header and footer', () => {
    const { container } = render(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
