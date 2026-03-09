import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import AdminDashboard from '../AdminDashboard';

describe('AdminDashboard', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <AdminDashboard />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
