import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import pokemons from '../data';
import App from '../App';
import renderWithRouter from './renderWithRouter';

// usando o primeiro pokemon da 'api' como base para renderizar os testes
const { name, summary, foundAt } = pokemons[0];

describe('Testes do componente Pokemon Details', () => {
  it('Verifica se as informações detalhadas são mostradas', () => {
    renderWithRouter(<App />);

    const detailsEl = screen.getByRole('link', { name: /more details/i });
    expect(detailsEl).toBeInTheDocument();

    userEvent.click(detailsEl);
    const headingEl = screen.getByRole('heading', { level: 2, name: `${name} Details` });
    const summaryEl = screen.getByRole('heading', { level: 2, name: /summary/i });
    const txtDetails = screen.getByText(summary);

    expect(headingEl).toBeInTheDocument();
    expect(summaryEl).toBeInTheDocument();
    expect(detailsEl).not.toBeInTheDocument();
    expect(txtDetails).toBeInTheDocument();
    expect(txtDetails).toContainHTML('p');
  });

  it('Verifica se existe seção com mapas de localização', () => {
    renderWithRouter(<App />);

    const detailsEl = screen.getByRole('link', { name: /more details/i });
    expect(detailsEl).toBeInTheDocument();

    userEvent.click(detailsEl);
    const headingEl = screen.getByRole('heading',
      { level: 2, name: `Game Locations of ${name}` });
    const locationsEls = screen.getAllByAltText(`${name} location`);

    expect(headingEl).toBeInTheDocument();
    expect(locationsEls).toHaveLength(foundAt.length);

    locationsEls.forEach((el, id) => expect(el.src).toBe(foundAt[id].map));
    foundAt.forEach((el) => expect(screen.getByText(el.location)).toBeInTheDocument());
  });

  it('Verifica se o usuário pode favoritar um pokemon nessa página', () => {
    renderWithRouter(<App />);

    const detailsEl = screen.getByRole('link', { name: /more details/i });
    expect(detailsEl).toBeInTheDocument();

    userEvent.click(detailsEl);
    const favInput = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favInput).toBeInTheDocument();

    userEvent.click(favInput);
    const star = screen.getByAltText(`${name} is marked as favorite`);
    expect(star).toBeInTheDocument();
    expect(star.src).toContain('/star-icon.svg');

    userEvent.click(favInput);
    expect(star).not.toBeInTheDocument();
  });
});
