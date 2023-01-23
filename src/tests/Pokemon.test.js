import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Teste o componente <Pokemon.js />', () => {
  it('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(/Pikachu/i);

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/Electric/i);

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);

    const pokemonImage = screen.getByAltText('Pikachu sprite');
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemonImage).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImage).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const linkDetails = screen.getByText(/More details/i);
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveTextContent(/More details/i);

    userEvent.click(linkDetails);
    const { pathname } = history.location;

    expect(pathname).toBe('/pokemon/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByText(/More details/i);
    expect(linkDetails).toBeInTheDocument();
    expect(linkDetails).toHaveTextContent(/More details/i);

    userEvent.click(linkDetails);

    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteButton).toBeInTheDocument();

    userEvent.click(favoriteButton);

    userEvent.click(linkDetails);

    const pikachu = screen.getByTestId('pokemon-name');
    expect(pikachu).toBeInTheDocument();
    expect(pikachu).toHaveTextContent(/Pikachu/i);

    const favoriteImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteImg).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
