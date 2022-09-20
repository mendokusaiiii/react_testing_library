import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando o componenete Pokedex', () => {
  test('Testa se os pokemons são exibidos ', async () => {
    renderWithRouter(<App />);

    const initialPokemon = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(initialPokemon).toBeInTheDocument();

    const nextPokemonBtn = screen.getByTestId('next-pokemon');
    expect(nextPokemonBtn).toBeInTheDocument();
    expect(nextPokemonBtn).toHaveProperty('disabled', false);
    userEvent.click(nextPokemonBtn);

    const secondPokemon = await screen.findByAltText(/charmander sprite/i);
    expect(secondPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);

    const thirdPokemon = await screen.findByAltText(/Dragonair sprite/);
    expect(thirdPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);

    const firstPokemon = await screen.findByAltText(/Pikachu sprite/);
    expect(firstPokemon).toBeInTheDocument();
  });
  test('Testa se o botão contem o texto Proximo Pokémon', () => {
    renderWithRouter(<App />);

    const nextPokemonBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonBtn).toHaveTextContent('Próximo pokémon');
  });
  test('Testa se é  mostrado apenas um pokemon por vez', () => {
    renderWithRouter(<App />);
    const pokemonImg = screen.getAllByRole('img');
    expect(pokemonImg.length).toBe(1);
  });
  test('Testa se existe um filtro para cada pokemon, sem repetição', () => {
    const POKEMONS = 7;
    renderWithRouter(<App />);

    const getPokemonByType = screen.getAllByTestId('pokemon-type-button');
    expect(getPokemonByType.length).toBe(POKEMONS);
  });
  test('Testa se está circulando somente pokemons de determinado tipo', async () => {
    renderWithRouter(<App />);

    const fireType = screen.getByRole('button', { name: /Fire/i });
    expect(fireType).toBeInTheDocument();

    userEvent.click(fireType);

    const charmander = await screen.findByAltText(/Charmander sprite/i);
    expect(charmander).toBeInTheDocument();

    const nextPokemonBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonBtn).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);

    const rapidash = await screen.findByAltText(/Rapidash sprite/i);
    expect(rapidash).toBeInTheDocument();
  });
  test('Testa se o botão corresponde ao tipo do pokémon', () => {
    renderWithRouter(<App />);

    const electricType = screen.getAllByRole('button');
    expect(electricType[1]).toHaveTextContent('Electric');

    const bugType = screen.getAllByRole('button');
    expect(bugType[3]).toHaveTextContent('Bug');
  });
  test('Testa se o botão All está sempre visível', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();
  });
  test('Testa se a Pokédex contém um botão para resetar o filtro', async () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();
    expect(allBtn).toHaveTextContent('All');

    userEvent.click(allBtn);

    const initialPokemon = screen.getByRole('img', { name: /Pikachu sprite/i });
    expect(initialPokemon).toBeInTheDocument();

    const nextPokemonBtn = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonBtn).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);

    const secondPokemon = await screen.findByAltText(/Charmander sprite/i);
    expect(secondPokemon).toBeInTheDocument();

    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);
    userEvent.click(nextPokemonBtn);

    const thirdPokemon = await screen.findByAltText(/Dragonair sprite/i);
    expect(thirdPokemon).toBeInTheDocument();
  });
});
