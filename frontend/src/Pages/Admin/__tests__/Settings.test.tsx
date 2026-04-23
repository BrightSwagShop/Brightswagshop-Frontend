import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Settings from "../Settings";

describe('Settings Page', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <Settings />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
