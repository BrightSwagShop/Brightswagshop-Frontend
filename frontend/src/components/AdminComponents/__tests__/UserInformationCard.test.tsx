import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserInformationCard from "../UserInformationCard";

describe('UserInformationCard Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<UserInformationCard />);
    expect(container).toBeInTheDocument();
  });
});
