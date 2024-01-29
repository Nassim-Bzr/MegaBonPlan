import React from 'react';
import { Link } from 'react-router-dom';
import logohome from '../../assets/Votre texte de paragraphe.png';
import './header.css'

export default function Header() {
  return (
    <div className='header'> 
   <img className='logohome'src={logohome}/> 
    <div className='sign-up'> 
    <button className='btn-inscription'>
    <Link className='link-inscription' to='/inscription'>
      Inscription
    </Link>
    </button>
    <button className='btn-connexion'>
    <Link className='link-connexion' to='/connexion'>
      Connexion
    </Link>
    </button>
    
    </div>
      <nav className='navbar'>
        {/* Ajoutez la propriété 'to' au composant Link */}
        <div className='link-new'>
        <Link to="/" className='link-navbar'>
        Accueil
        </Link>
        </div>
        <Link to="/chemin-destination" className='link-navbar'>
Bon plans
        </Link>
        <Link to="/chemin-destination" className='link-navbar'>
Catégories
        </Link>
        <Link to="/chemin-destination" className='link-navbar'>
Prochaines sorties
        </Link>
        <Link to="/chemin-destination" className='link-navbar'>
          Code promos
        </Link>
        <Link to="/chemin-destination" className='link-navbar'>
Discussions
        </Link>
        <Link to="/chemin-destination" className='link-navbar'>
          Gratuit
        </Link>
       
        <form className="search-form">
          <input type="text" className="search-input" placeholder="Rechercher..."/>
          <button type="submit" className="search-button">Rechercher</button>
        </form>
      </nav>
    </div>
  );
}

 

