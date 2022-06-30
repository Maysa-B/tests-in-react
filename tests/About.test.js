import { screen } from '@testing-library/react';
import React from 'react';
import About from '../pages/About';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente About', () => {
  it('Verifica se a página contém informações sobre a pokedex', () => {
    renderWithRouter(<About />);

    const txt1 = screen.getByText(/digital encyclopedia containing all Pokémons/i);
    const txt2 = screen.getByText(/can filter Pokémons by type/i);

    expect(txt1).toBeInTheDocument();
    expect(txt2).toBeInTheDocument();
    expect(txt1).toContainHTML('p');
    expect(txt2).toContainHTML('p');
  });

  it('Verifica se há um h2 com o texto `About pokédex`', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });

    expect(heading).toBeInTheDocument();
  });

  it('Verifica a imagem da página', () => {
    renderWithRouter(<About />);
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const img = screen.getByRole('img');

    expect(img).toBeInTheDocument();
    expect(img.src).toBe(URL);
    expect(img.alt).toBe('Pokédex');
  });
});
