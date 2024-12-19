import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemContext';
import { AuthProvider } from '../../AuthContext';
import App from './App';

// Mock simple des composants qui posent problème
jest.mock('../BonPlanDetails', () => () => null);
jest.mock('react-comments-section', () => ({
  CommentSection: () => null
}));

// Mock du Header et Footer
jest.mock('../Header', () => {
  return function DummyHeader() {
    return <div role="banner">Header</div>;
  };
});

jest.mock('../Footer', () => {
  return function DummyFooter() {
    return <div>Footer</div>;
  };
});

// Mock du contexte de thème
const mockThemeContext = {
  isDarkMode: false,
  toggleTheme: jest.fn()
};

// Mock du contexte d'authentification
jest.mock('../../AuthContext', () => ({
  AuthProvider: ({ children }) => children,
  useAuth: () => ({
    user: null,
    login: jest.fn(),
    logout: jest.fn()
  })
}));

describe('App Component', () => {
  const renderApp = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <ThemeContext.Provider value={mockThemeContext}>
            <App />
          </ThemeContext.Provider>
        </AuthProvider>
      </BrowserRouter>
    );
  };

  test('renders without crashing', () => {
    renderApp();
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
}); 