import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import HomePage from '../HomePage';

vi.mock('axios');

const mockedGet = vi.mocked(axios.get);

describe('HomePage', () => {
  it('renders product categories', async () => {
    mockedGet.mockResolvedValue({
      data: [
        { name: 'TShirt', slug: 'tshirt' },
        { name: 'Mok', slug: 'mok' },
        { name: 'Hoodie', slug: 'hoodie' },
        { name: 'Sticker', slug: 'sticker' },
      ],
      status: 200,
      statusText: 'OK',
      headers: {},
      config: { headers: {} },
    });

    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    expect(await screen.findByText('BrightSwagShop')).toBeInTheDocument();
    expect(await screen.findByText('Hoodie')).toBeInTheDocument();
  });
});