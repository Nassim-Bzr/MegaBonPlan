// index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App/App'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './app/store'
import { Provider as ReduxProvider } from 'react-redux' // Utilise ReduxProvider pour éviter toute confusion
import { AuthProvider } from './AuthContext'
import { ThemeProvider } from '../src/contexts/ThemContext'
import { ChakraProvider } from "@chakra-ui/react";
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
    <ChakraProvider>
      {' '}
      {/* Inclure le Provider Redux ici avec le store */}
      <Router>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
        </ThemeProvider>
      </Router>
      </ChakraProvider>
    </ReduxProvider>
  </React.StrictMode>
)
