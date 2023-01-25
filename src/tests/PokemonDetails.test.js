import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import PokemonDetails from '../pages/PokemonDetails';
import renderWithRouter from '../helper/renderWithRouter';
import App from '../App';

beforeEach(() => {
  renderWithRouter(<App />);
  const moreDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  expect(moreDetails).toBeInTheDocument();
  expect(moreDetails).toHaveTextContent('More details');
  userEvent.click(moreDetails);
  const pokemonDetails = screen.getByText('Pikachu Details');
  expect(pokemonDetails).toBeInTheDocument();
  expect(moreDetails).not.toBeInTheDocument();
});

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    expect(summary).toBeInTheDocument();

    const description = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    expect(description).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    const gameLocations = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    expect(gameLocations).toBeInTheDocument();

    const maps = screen.getAllByAltText(/Pikachu location/i);
    expect(maps).toHaveLength(2);
    expect(maps[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(maps[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
  });
});

describe('Testa se é possível favoritar ou desfavoritar um Pokémon', () => {
  it('Teste se o usuário pode favoritar um Pokémon através da página de detalhes:', () => {
    const favoritePokemon = screen.getByLabelText(/pokémon favoritado\?/i);
    expect(favoritePokemon).toBeInTheDocument();

    const favoriteSection = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    expect(favoriteSection).toBeInTheDocument();

    userEvent.click(favoriteSection);

    const noFavoritePokemon = screen.getByText(/no favorite pokémon found/i);
    expect(noFavoritePokemon).toBeInTheDocument();
    const home = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(home);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    const pikachuDetails = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(pikachuDetails).toBeInTheDocument();

    const favoriteButton = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteButton).toBeInTheDocument();
    userEvent.click(favoriteButton);

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémon/i,
    });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const favoriteImg = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoriteImg).toBeInTheDocument();
  });
});
