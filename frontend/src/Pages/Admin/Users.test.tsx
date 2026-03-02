import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Users from './Users';

describe('Users Page', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <Users />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
