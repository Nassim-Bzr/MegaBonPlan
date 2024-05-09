// index.js
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './components/App/App'
import { BrowserRouter as Router } from 'react-router-dom'
import { store } from './app/store'
import { Provider as ReduxProvider } from 'react-redux' // Utilise ReduxProvider pour éviter toute confusion
import { AuthProvider } from './AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      {' '}
      {/* Inclure le Provider Redux ici avec le store */}
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </ReduxProvider>
  </React.StrictMode>
)
