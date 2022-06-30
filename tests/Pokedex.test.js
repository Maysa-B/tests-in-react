import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import pokemons from '../data';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from './renderWithRouter';

const PROPS_ALL_NOT_FAVORITE = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

describe('Testes do componente Pokedex', () => {
  it('Verifica o h2 com o texto `Encountered pokémons`', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ PROPS_ALL_NOT_FAVORITE }
    />);

    const titleEl = screen.getByRole('heading',
      { name: /encountered pokémons/i, level: 2 });

    expect(titleEl).toBeInTheDocument();
  });

  it('Verifica se ao clicar em `próximo pokémon`, o próximo é renderizado', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ PROPS_ALL_NOT_FAVORITE }
    />);

    const pokemonEl = screen.getByTestId('pokemon-name');
    const btnProx = screen.getByRole('button', { name: /próximo pokémon/i });

    expect(pokemonEl).toBeInTheDocument();
    expect(pokemonEl.textContent).toEqual('Pikachu');
    expect(btnProx).toBeInTheDocument();

    userEvent.click(btnProx);
    expect(pokemonEl.textContent).not.toEqual('Pikachu');
  });

  it('Verifica se mostra apenas um pokémon por vez', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ PROPS_ALL_NOT_FAVORITE }
    />);

    const pokeCardEl = screen.getAllByTestId('pokemon-name');

    expect(pokeCardEl).toHaveLength(1);
    expect(pokeCardEl[0]).toBeInTheDocument();
  });

  it('Verifica os botões da aplicação', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ PROPS_ALL_NOT_FAVORITE }
    />);

    const allFiltersBtn = screen.getAllByTestId('pokemon-type-button');
    const allBtn = screen.getByRole('button', { name: /all/i });
    const electricBtn = screen.getByRole('button', { name: /electric/i });
    const fireBtn = screen.getByRole('button', { name: /fire/i });
    const bugBtn = screen.getByRole('button', { name: /bug/i });
    const poisonBtn = screen.getByRole('button', { name: /poison/i });
    const psychicBtn = screen.getByRole('button', { name: /psychic/i });
    const normalBtn = screen.getByRole('button', { name: /normal/i });
    const dragonBtn = screen.getByRole('button', { name: /dragon/i });
    const next = screen.getByRole('button', { name: /próximo pokémon/i });

    const all = [allBtn, electricBtn, fireBtn, bugBtn,
      poisonBtn, psychicBtn, normalBtn, dragonBtn];

    all.forEach((btn) => expect(btn).toBeInTheDocument());
    expect(allFiltersBtn).toHaveLength(all.length - 1);
    // menos 1 pois não considera o filter "all";

    userEvent.click(fireBtn);
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType.textContent).toEqual('Fire');
    userEvent.click(next);
    expect(pokeType).toBeInTheDocument();
    expect(pokeType.textContent).toBe('Fire');
  });

  it('Verifica se existe o botão para resetar filtros', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ PROPS_ALL_NOT_FAVORITE }
    />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    const fireBtn = screen.getByRole('button', { name: /fire/i });
    const pokeType = screen.getByTestId('pokemon-type');

    expect(pokeType).toBeInTheDocument();
    expect(pokeType.textContent).toEqual('Electric');
    expect(allBtn).toBeInTheDocument();
    expect(fireBtn).toBeInTheDocument();

    userEvent.click(fireBtn);
    expect(pokeType.textContent).toEqual('Fire');
    userEvent.click(allBtn);
    expect(pokeType.textContent).toEqual('Electric');
  });
});
