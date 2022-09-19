import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../helpers/renderWithRouter';
import App from '../App';

describe('Testando os componentes da aplicação', () => {
  test('Se App renderiza', () => {
    renderWithRouter(<App />);

    const renderHome = screen.getByRole('link', { name: /Home/i });
    expect(renderHome).toBeInTheDocument();

    const renderAbout = screen.getByRole('link', { name: /About/i });
    expect(renderAbout).toBeInTheDocument();

    const renderFavorite = screen.getByRole('link', { name: /Favorite/i });
    expect(renderFavorite).toBeInTheDocument();
  });
  test('Se redireciona para a pagina inicial', () => {
    const { history } = renderWithRouter(<App />);
    const renderHome = screen.getByRole('link', { name: /Home/i });
    userEvent.click(renderHome);
    expect(history.location.pathname).toBe('/');
  });
  test('Se redireciona para About', async () => {
    const { history } = renderWithRouter(<App />);
    const renderAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(renderAbout);
    await waitFor(() => expect(history.location.pathname).toBe('/about'));
  });
  test('Se redireciona para os favoritos', async () => {
    const { history } = renderWithRouter(<App />);

    const renderFavorite = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(renderFavorite);
    await waitFor(() => expect(history.location.pathname).toBe('/favorites'));
  });
  test('Se redireciona para NotFound', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/**');
    });
    expect(history.location.pathname).toBe('/**');
    const notFound = screen.getByRole('heading', { name: /page requested not found/i });
    const notFoundPikachu = screen.getByRole(
      'img',
      { name: /pikachu crying because the page requested was not found/i },
    );
    expect(notFound).toBeInTheDocument();
    expect(notFoundPikachu).toBeInTheDocument();
  });
});
