import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testes do componente App', () => {
  it('Verifica conjunto de links de navegação', () => {
    renderWithRouter(<App />);

    const home = screen.getByRole('link', { name: /home/i });
    const about = screen.getByRole('link', { name: /about/i });
    const favorite = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  it('Verifica se, ao clicar no link `Home`, a página se redireciona para o path `/`',
    () => {
      const { history } = renderWithRouter(<App />);

      const btnHome = screen.getByRole('link', { name: /home/i });
      expect(btnHome).toBeInTheDocument();

      userEvent.click(btnHome);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/');
    });

  it('Verifica o redirecionamento após clicar no link `About`', () => {
    const { history } = renderWithRouter(<App />);

    const btnAbout = screen.getByRole('link', { name: /about/i });
    expect(btnAbout).toBeInTheDocument();

    userEvent.click(btnAbout);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  it('Verifica o redirecionamento após clicar no link `Favorite Pokémons`', () => {
    const { history } = renderWithRouter(<App />);

    const btnFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(btnFavorites).toBeInTheDocument();

    userEvent.click(btnFavorites);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  it('Verifica se a página é redirecionada para Not Found ao ir para URL desconhecida',
    () => {
      const { history } = renderWithRouter(<App />);

      history.push('/url/desconhecida');
      const heading = screen.getByRole('heading', { name: /page requested not found/i });

      expect(heading).toBeInTheDocument();
    });
});
