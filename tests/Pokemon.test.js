import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './renderWithRouter';

// usando o primeiro pokemon da 'api' como base para renderizar os testes
const { averageWeight, id, image, name, type } = pokemons[0];
const { measurementUnit, value } = averageWeight;

describe('Testes do componente Pokemon', () => {
  it('Verifica a renderização de um card de um pokemon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink
      isFavorite={ false }
    />);

    const nameEl = screen.getByTestId('pokemon-name');
    const typeEl = screen.getByTestId('pokemon-type');
    const weightEl = screen.getByTestId('pokemon-weight');
    const imgEl = screen.getByAltText(`${name} sprite`);

    expect(nameEl).toBeInTheDocument();
    expect(nameEl.textContent).toBe(name);
    expect(typeEl).toBeInTheDocument();
    expect(typeEl.textContent).toBe(type);
    expect(weightEl).toBeInTheDocument();
    expect(weightEl.textContent).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(imgEl).toBeInTheDocument();
    expect(imgEl.src).toBe(image);
  });

  it('Verifica link para a página pokemon details', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink
      isFavorite={ false }
    />);

    const linkEl = screen.getByRole('link', { name: /more details/i });

    expect(linkEl).toBeInTheDocument();
    expect(linkEl.href).toContain(`pokemons/${id}`);
  });

  it('Verifica de o redirecionamento do link funciona para o pokemon details', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink
      isFavorite={ false }
    />);

    const linkEl = screen.getByRole('link', { name: /more details/i });

    expect(linkEl).toBeInTheDocument();
    userEvent.click(linkEl);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  it('Verifica o ícone de estrela nos pokemons favoritos', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      showDetailsLink
      isFavorite
    />);

    const star = screen.getByAltText(`${name} is marked as favorite`);

    expect(star).toBeInTheDocument();
    expect(star.src).toContain('/star-icon.svg');
  });
});
