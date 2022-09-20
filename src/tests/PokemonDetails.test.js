import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente PokemonDetails', () => {
  const pokemonId = 'pokemon-name';
  const pokemonDetails = '/pokemons/25';
  test('Testa se as informações detalhadas dos pokémons são mostradas', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(pokemonDetails);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const firstPokemonDetails = screen.findByRole(
      'heading',
      { name: /pikachu details/i },
    );
    expect(firstPokemonDetails).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();

    const summary = await screen.findByRole('heading', { level: 2, name: /Summary/i });
    expect(summary).toBeInTheDocument();

    const pokemonName = screen.getByTestId(pokemonId).textContent;
    const findPokemon = pokemons.find((element) => element.name === pokemonName);

    const summarySection = screen.getByText(findPokemon.summary);
    expect(summarySection).toBeInTheDocument();
  });
  test('Testa se existe na página uma seção com os mapas...', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(pokemonDetails);

    const pokemonName = screen.getByTestId(pokemonId).textContent;
    const findPokemon = pokemons.find((element) => element.name === pokemonName);
    const gameLocations = await screen.findByRole(
      'heading',
      { level: 2, name: /Game Locations of/i },
    );
    expect(gameLocations.textContent.includes(pokemonName)).toBe(true);

    const imgLocation = screen.getAllByRole('img', { name: `${pokemonName} location` });
    expect(imgLocation[0]).toHaveAttribute('src', `${findPokemon.foundAt[0].map}`);
  });
  test('Testa se o usuário pode favoritar um pokemon', async () => {
    const { history } = renderWithRouter(<App />);
    history.push(pokemonDetails);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const favoritePokemon = await screen.findByText(/pokémon favoritado/i);
    expect(favoritePokemon).toBeInTheDocument();

    const favorites = screen.getByRole('checkbox', { name: /pokémon favoritado/i });
    expect(favorites.checked).toBe(false);
    await userEvent.click(favorites);
    expect(favorites.checked).toBe(true);
  });
});
