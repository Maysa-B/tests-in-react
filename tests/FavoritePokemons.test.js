import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import FavoritePokemons from '../pages/FavoritePokemons';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testes do componente Favorite pokemons', () => {
  it('Verifica se aparece a mensagem de vazio caso nenhum pokemon favorito', () => {
    renderWithRouter(<FavoritePokemons />);

    const txtEmpty = screen.getByText(/No favorite pokemon found/i);

    expect(txtEmpty).toBeInTheDocument();
    expect(txtEmpty).toContainHTML('p');
  });

  it('Verifica se aparece todos os favoritos na página', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/4');
    const favCharmander = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(favCharmander);

    history.goBack();
    history.push('pokemons/148');
    const favDragonair = screen.getByLabelText(/pokémon favoritado?/i);
    userEvent.click(favDragonair);

    const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavorite).toBeInTheDocument();
    userEvent.click(linkFavorite);
    expect(history.location.pathname).toBe('/favorites');

    const cardCharmander = screen.getByText(/charmander/i);
    const cardDragonair = screen.getByText(/dragonair/i);
    const imgs = screen.getAllByRole('img');
    const NUMBER_IMGS = 4;

    expect(cardCharmander).toBeInTheDocument();
    expect(cardDragonair).toBeInTheDocument();
    expect(imgs).toHaveLength(NUMBER_IMGS);
  });
});
