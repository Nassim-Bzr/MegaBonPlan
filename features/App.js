import { render, screen } from '@testing-library/react';
import App from './App';

test('Le composant App se rend correctement', () => {
  render(<App />);
  const linkElement = screen.getByText(/renders without crashing/i);
  expect(linkElement).toBeInTheDocument();
});