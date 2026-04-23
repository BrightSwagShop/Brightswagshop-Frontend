import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import CategoryItemsPage from "../CategoryItemsPage";

vi.mock('../../services/productService', () => ({
  getProductsByType: vi.fn().mockResolvedValue([]),
}));

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
