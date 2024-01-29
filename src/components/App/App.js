import './App.css';
import Footer from '../Footer/index';
import Header from '../Header/index';
import Home from '../Home/index';
import Signin from '../Signin/index';
import Signup from '../SignUp/index'; // Assurez-vous d'avoir un composant pour la page 'À propos'
// Autres imports de pages si nécessaire
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inscription" element={<Signup />} />
          <Route path="/connexion" element={<Signin/>} />
          {/* Ajoutez d'autres routes ici pour d'autres pages */}
        </Routes>
        <Footer/>
      
    </div>
  );
}

export default App;
