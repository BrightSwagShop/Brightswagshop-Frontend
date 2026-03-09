import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import AdminSidebar from '../AdminSidebar';

describe('AdminSidebar Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <AdminSidebar collapsed={false} onToggle={function (): void {
                throw new Error('Function not implemented.');
            } } />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
