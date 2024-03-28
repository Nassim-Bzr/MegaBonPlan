import React from "react";
import { Link } from "react-router-dom";
import logohome from "../../assets/Votre texte de paragraphe.png";
import "./header.css";
import { useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="header">
      {" "}
      <Link className="link-logohome" to="/">
        <img className="logohome" src={logohome} />
      </Link>
      <div className="sign-up">
        <button className="btn-inscription">
          <Link className="link-inscription" to="/inscription">
            Inscription
          </Link>
        </button>
        <button className="btn-connexion">
          <Link className="link-connexion" to="/connexion">
            Connexion
          </Link>
        </button>
      </div>
      <nav className="navbar">
        {/* Ajoutez la propriété 'to' au composant Link */}
        <div className="link-new">
          <Link to="/" className="link-navbar">
            Accueil
          </Link>
        </div>
        <Link to="/bonsplans" className="link-navbar">
          Bon plans
        </Link>
        <Link to="/category" className="link-navbar">
          Catégories
        </Link>

        <div className="dropdown" onMouseLeave={() => setIsDropdownOpen(false)}>
          <Link
            className="link-navbar dropdown-button"
            onMouseOver={() => setIsDropdownOpen(true)}
            to="/codespromos"
          >
            Code promos
          </Link>
        
        </div>
        <Link to="/discussions" className="link-navbar">
          Discussions
       </Link>
      

        <form className="search-form">
          <input
            type="text"
            className="search-input"
            placeholder="Rechercher..."
          />
          <button type="submit" className="search-button">
            Rechercher
          </button>
        </form>
      </nav>
    </div>
  );
}
