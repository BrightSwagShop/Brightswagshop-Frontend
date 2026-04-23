import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loading from '../../components/Loading';

describe('Loading Component', () => {
  it('renders loading spinner', () => {
    const { container } = render(<Loading />);
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });
});
