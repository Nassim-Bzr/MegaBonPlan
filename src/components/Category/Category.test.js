import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import Category from './Category';

// Mock de fetch pour simuler l'API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        id_categorie: 1,
        nomcategorie: "Électronique",
        imglink: "test-image.jpg",
        description: "Produits électroniques et high-tech"
      },
      {
        id_categorie: 2,
        nomcategorie: "Mode",
        imglink: "test-image-2.jpg",
        description: "Vêtements et accessoires"
      }
    ])
  })
);

describe('Category Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  // Test du rendu initial
  test('renders category title', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Category />
        </BrowserRouter>
      );
    });

    expect(screen.getByText('Découvrez nos Catégories')).toBeInTheDocument();
  });

  // Test de l'appel API
  test('fetches and displays categories from API', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Category />
        </BrowserRouter>
      );
    });

    // Vérifie que l'API a été appelée
    expect(fetch).toHaveBeenCalledWith(
      'https://megabonplan-f8522b195111.herokuapp.com/api/categories'
    );

    // Vérifie que les catégories sont affichées
    expect(await screen.findByText('Électronique')).toBeInTheDocument();
    expect(await screen.findByText('Mode')).toBeInTheDocument();
  });

  // Test des images
  test('renders category images correctly', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Category />
        </BrowserRouter>
      );
    });

    const images = await screen.findAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'test-image.jpg');
    expect(images[1]).toHaveAttribute('src', 'test-image-2.jpg');
  });

  // Test de la navigation
  test('navigates to category detail when clicked', async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <Category />
        </BrowserRouter>
      );
    });

    const categoryLinks = await screen.findAllByRole('link');
    expect(categoryLinks[0]).toHaveAttribute('href', '/category/1');
  });

  // Test de gestion d'erreur
  test('handles API error gracefully', async () => {
    // Mock d'une erreur API
    fetch.mockImplementationOnce(() => Promise.reject('API error'));

    await act(async () => {
      render(
        <BrowserRouter>
          <Category />
        </BrowserRouter>
      );
    });

    expect(await screen.findByText('Aucune catégorie disponible')).toBeInTheDocument();
  });
}); 