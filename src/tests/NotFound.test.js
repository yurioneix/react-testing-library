import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../helper/renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);

    const h2 = screen.getByRole('heading', { name: /Page requested not found/i, level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('Page requested not found');
  });

  it('Teste se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByRole('img', { src: 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif' });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
