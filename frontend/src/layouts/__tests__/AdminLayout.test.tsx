import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import AdminLayout from '../../AdminLayout';

describe('AdminLayout', () => {
  it('renders admin layout', () => {
    const { container } = render(
      <BrowserRouter>
        <AdminLayout />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
