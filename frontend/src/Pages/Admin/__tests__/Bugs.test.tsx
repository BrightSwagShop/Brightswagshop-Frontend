import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Bugs from '../../Bugs';

describe('Bugs Page', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <Bugs />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
