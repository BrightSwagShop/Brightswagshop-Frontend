import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Products from './Products';

describe('Products Page', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <Products />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
