import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Dashboard from "../Dashboard";

describe('Dashboard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
