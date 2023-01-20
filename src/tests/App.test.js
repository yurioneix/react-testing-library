import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);

    const linkHome = screen.getByText(/Home/i);
    expect(linkHome).toBeInTheDocument();

    const linkAbout = screen.getByText(/About/i);
    expect(linkAbout).toBeInTheDocument();

    const linkPokemon = screen.getByText(/Favorite Pokémon/i);
    expect(linkPokemon).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const linkHome = screen.getByText(/Home/i);
    userEvent.click(linkHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Teste se a aplicação é redirecionada para a página de About', () => {
    const { history } = renderWithRouter(<App />);

    const linkAbout = screen.getByText(/About/i);
    userEvent.click(linkAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const linkPokemon = screen.getByText(/Favorite Pokémon/i);
    userEvent.click(linkPokemon);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
