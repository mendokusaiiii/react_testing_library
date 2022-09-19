import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../helpers/renderWithRouter';

describe('Testando o componenete NotFound', () => {
  test('Testa se a pagina contém um heading', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole(
      'heading',
      { level: 2, name: /Page requested not found/i },
    );
    expect(notFound).toBeInTheDocument();
  });
  test('Testa se a pagina mostra um imagem', () => {
    renderWithRouter(<NotFound />);
    const screenImgNotFound = screen.getByRole(
      'img',
      { name: /Pikachu crying because the page requested was not found/i },
    );
    expect(screenImgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
