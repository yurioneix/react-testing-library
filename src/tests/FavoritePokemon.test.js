import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemon from '../pages/FavoritePokemon';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

describe('Teste o componente <FavoritePokemon.js />', () => {
  it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos; ', () => {
    renderWithRouter(<FavoritePokemon />);

    const paragraph = screen.getByText('No favorite Pokémon found');

    expect(paragraph).toBeInTheDocument();
  });

  it('Teste se apenas são exibidos os Pokémon favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByText('More details');
    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemon/25');

    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémon/i });
    expect(favoritePokemons).toBeInTheDocument();
    userEvent.click(favoritePokemons);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
