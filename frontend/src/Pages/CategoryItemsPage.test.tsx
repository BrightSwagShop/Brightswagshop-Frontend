import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import CategoryItemsPage from './CategoryItemsPage';

describe('CategoryItemsPage', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <CategoryItemsPage />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
