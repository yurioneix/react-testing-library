import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../helper/renderWithRouter';

describe('Teste o componente <Pokedex.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const title = screen.getByRole('heading', { name: /Encountered Pokémon/i, level: 2 });
    expect(title).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo Pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();
    expect(nextPokemonButton).toHaveTextContent(/Próximo Pokémon/i);

    userEvent.click(nextPokemonButton);

    const pokemonName = screen.getByText(/Charmander/i);
    expect(pokemonName).toBeInTheDocument();
  });

  it('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const filterButton = screen.getAllByTestId('pokemon-type-button');
    expect(filterButton).toHaveLength(7);

    const fireButton = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(fireButton);

    const firePokemons = screen.getByTestId('pokemon-type');
    expect(firePokemons).toBeInTheDocument();
    expect(firePokemons).toHaveTextContent('Fire');
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);

    const resetFilterButton = screen.getByRole('button', { name: /All/i });
    expect(resetFilterButton).toBeInTheDocument();
    expect(resetFilterButton).toHaveTextContent('All');
    expect(resetFilterButton).toBeEnabled();

    userEvent.click(resetFilterButton);

    const firstPokemon = screen.getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();

    const fireTypeButton = screen.getByRole('button', { name: /Fire/i });
    expect(fireTypeButton).toBeInTheDocument();

    userEvent.click(fireTypeButton);
    const pokemonName = screen.getByText(/Charmander/i);
    expect(pokemonName).toBeInTheDocument();

    userEvent.click(resetFilterButton);
    const pikachu = screen.getByText(/Pikachu/i);
    expect(pikachu).toBeInTheDocument();
    expect(pikachu).toHaveTextContent('Pikachu');
  });
});
