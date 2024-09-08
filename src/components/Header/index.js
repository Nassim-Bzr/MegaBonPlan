import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/Votre texte de paragraphe.png';
import { useAuth } from '../../AuthContext';
import SearchBar from '../SearchBar';
import { ThemeContext } from '../../contexts/ThemContext';
import { useContext } from 'react';


const Header = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Liste des éléments de navigation
  const navItems = [
    { title: 'Catégories', path: '/category' },
    { title: 'Bon Plans', path: '/bonsplans' },
    { title: 'Codes Promos', path: '/codespromos' },
    { title: 'Discussions', path: '/discussions' },
    { title: 'Contact', path: '/contact' },
    { title: 'FAQ', path: '/faq' },
  ];

  // Insertion de "Favoris" avant "FAQ" si l'utilisateur est connecté
  if (user) {
    const faqIndex = navItems.findIndex((item) => item.title === 'FAQ');
    navItems.splice(faqIndex, 0, { title: 'Favoris', path: '/favoris' });
  }

  return (
    <nav className="bg-white shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0">
      <div className="max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex justify-between items-center py-3 md:py-5">
          <Link to="/">
            <img src={Logo} alt="Logo" width={120} height={50} />
          </Link>
          <button className="md:hidden" onClick={handleMenuToggle}>
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:justify-between w-full md:w-auto`}
        >
          <ul className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="text-gray-700 hover:text-gray-900"
                  onClick={handleLinkClick}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <SearchBar />
          {user ? (
            <div className="mt-4 right-2 flex flex-col md:flex-row md:items-center md:space-x-4">
              <span className="mr-4">Bonjour, <span className="font-bold">{user.nom}</span></span>
              <Link
                to="/profil"
                className="py-2 px-4 text-white  rounded mt-2 md:mt-0 md:ml-4"
                onClick={handleLinkClick}
              >

<div class="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
    <svg class="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
</div>

              </Link>
            </div>
          ) : (
            <div className="mt-4 ml-32 md:mt-0 flex flex-col md:flex-row md:items-center md:space-x-4">
              <Link to="/connexion" className="py-2 md:py-0 md:mr-4" onClick={handleLinkClick}>
                Connexion
              </Link>
              <Link
                to="/inscription"
                className="py-2 px-4 text-white bg-blue-500 hover:bg-blue-700 rounded mt-2 md:mt-0"
                onClick={handleLinkClick}
              >
                Inscription
              </Link>
            </div>
          )}
        </div>
      </div>
      <button onClick={toggleTheme} className="theme-toggle">
        {isDarkMode ? '☀️' : '🌙'}
      </button>
    </nav>
  );
};

export default Header;
