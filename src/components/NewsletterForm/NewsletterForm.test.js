import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import NewsletterForm from './index';

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ message: 'Subscription successful' })
  })
);

describe('NewsletterForm Component', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders newsletter form', async () => {
    await act(async () => {
      render(<NewsletterForm />);
    });

    expect(screen.getByText("Abonnez-vous à notre Newsletter")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Entrez votre email")).toBeInTheDocument();
  });

  test('handles form submission', async () => {
    await act(async () => {
      render(<NewsletterForm />);
    });

    const emailInput = screen.getByPlaceholderText("Entrez votre email");
    const submitButton = screen.getByText("S'abonner");

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/subscriptions/subscribe'),
        expect.any(Object)
      );
    });
  });
}); 