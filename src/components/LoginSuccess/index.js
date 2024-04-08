// Exemple de composant LoginSuccess.js
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get('name');
    if (name) {
      // Stockez le nom de l'utilisateur pour l'utiliser dans l'application
      localStorage.setItem('userName', name);
      // Redirigez l'utilisateur où vous voulez après la connexion
      navigate('/');
    }
  }, [location, navigate]);

  return null; // Ou retournez un indicateur de chargement
};
 
export default LoginSuccess;