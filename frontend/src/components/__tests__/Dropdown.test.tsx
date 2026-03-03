import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Dropdown from '../../Dropdown';

describe('Dropdown Component', () => {
  const mockItems = [
    { label: 'Item 1', to: '/item1' },
    { label: 'Item 2', to: '/item2' },
  ];

  it('renders dropdown with label', () => {
    render(
      <BrowserRouter>
        <Dropdown label="Test Menu" items={mockItems} />
      </BrowserRouter>
    );
    expect(screen.getByText('Test Menu')).toBeInTheDocument();
  });
});
