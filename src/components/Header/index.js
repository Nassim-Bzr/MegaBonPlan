import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'

export default function Header() {
  return (
    <div className='header'> 
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
          SOLDES
        </Link>
        <Link to="/chemin-destination" className='link-navbar'>
          PRECOMMANDES
        </Link>
        <Link to="/chemin-destination" className='link-navbar'>
        PROCHAINES SORTIES
        </Link>
        <Link to="/chemin-destination" className='link-navbar'>
          TEST
        </Link>
        <Link to="/chemin-destination" className='link-navbar'>
          GUIDE D'ACHAT
        </Link>
        <Link to="/chemin-destination" className='link-navbar'>
          BLOG
        </Link>
        <Link to="/chemin-destination" className='link-navbar'>
          NOTRE APPLI
        </Link>
        <form className="search-form">
          <input type="text" className="search-input" placeholder="Rechercher..."/>
          <button type="submit" className="search-button">Rechercher</button>
        </form>
      </nav>
    </div>
  );
}

 

