import { screen } from '@testing-library/react';
import React from 'react';
import NotFound from '../pages/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente NotFound', () => {
  it('Verifica o texto da página', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    const span = screen.getByLabelText(/crying emoji/i);

    expect(heading).toBeInTheDocument();
    expect(span).toBeInTheDocument();
  });

  it('Verifica a imagem da página', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByAltText(/Pikachu crying because the page requested was/i);

    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
