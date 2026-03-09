import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import DetailPageItem from "../DetailPageItem";

describe('DetailPageItem', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <BrowserRouter>
        <DetailPageItem />
      </BrowserRouter>
    );
    expect(container).toBeInTheDocument();
  });
});
