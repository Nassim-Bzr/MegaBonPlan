import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Alert from './index';

describe('Alert Component', () => {
  test('renders success message', async () => {
    await act(async () => {
      render(<Alert />);
    });
    
    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Le bon plan à bien été ajouté au favoris.')).toBeInTheDocument();
  });
}); 