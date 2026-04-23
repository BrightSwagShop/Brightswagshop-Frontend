import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import AdminBeadcrumbs from "../AdminBeadcrumbs";

describe('AdminBeadcrumbs Component', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <AdminBeadcrumbs />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
