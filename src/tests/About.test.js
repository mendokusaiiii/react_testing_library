import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testando o componente About', () => {
  test('Se a pagina contém informações da Pokedex', () => {
    renderWithRouter(<About />);

    const aboutPokedex = screen.getByRole(
      'heading',
      { level: 2, name: /About Pokédex/i },
    );
    expect(aboutPokedex).toBeInTheDocument();

    const pokedexImg = screen.getByRole('img', { name: /Pokédex/i });
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
