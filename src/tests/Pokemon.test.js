import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testando o componente Pokemon', () => {
  const pokemonId = 'pokemon-name';
  test('Testa se é ernderizado um card com as informações', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(pokemonId).textContent;
    const pokemonImg = screen.getByRole('img', { name: `${pokemonName} sprite` });
    expect(pokemonImg).toBeInTheDocument();
  });
  test('Testa se o tipo do pokémon é mostrado corretamente', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(pokemonId).textContent;
    const findPokemon = pokemons.find((element) => element.name === pokemonName);
    const pokemonType = screen.getByTestId('pokemon-type').textContent;
    expect(pokemonType).toBe(findPokemon.type);
  });
  test('Testa se a imagem do pokémon é exibida corretamente', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByTestId(pokemonId).textContent;
    const findPokemon = pokemons.find((element) => element.name === pokemonName);
    const pokemonImg = screen.getByRole('img', { name: `${pokemonName} sprite` });
    expect(pokemonImg).toHaveAttribute('src', `${findPokemon.image}`);
  });
  test('Testa se existe um ícone de estrela nos pokémons é favoritado', async () => {
    renderWithRouter(<App />);

    const details = screen.getByText(/More details/i);
    userEvent.click(details);

    const favorites = await screen.findByText('Pokémon favoritado?');
    userEvent.click(favorites);

    const linkToHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(linkToHome);

    const pokemonName = screen.getByTestId(pokemonId).textContent;
    console.log(pokemonName);
    const favoriteSelect = await screen.findByRole(
      'img',
      { name: `${pokemonName} is marked as favorite` },
    );
    expect(favoriteSelect).toHaveAttribute('src', '/star-icon.svg');
  });
});
