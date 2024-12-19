import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Modal from './index';

// Mock du portail React
const mockPortalRoot = document.createElement('div');
mockPortalRoot.setAttribute('id', 'modal-root');
document.body.appendChild(mockPortalRoot);

describe('Modal Component', () => {
  const mockOnClose = jest.fn();
  const mockTitle = 'Test Modal';
  const mockContent = 'Test Content';

  test('renders modal with title and content', async () => {
    await act(async () => {
      render(
        <Modal onClose={mockOnClose} title={mockTitle}>
          {mockContent}
        </Modal>
      );
    });

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
    expect(screen.getByText(mockContent)).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', async () => {
    await act(async () => {
      render(
        <Modal onClose={mockOnClose} title={mockTitle}>
          {mockContent}
        </Modal>
      );
    });

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClose).toHaveBeenCalled();
  });
}); 