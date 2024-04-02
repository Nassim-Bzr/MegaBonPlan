import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Votre texte de paragraphe.png";

// Remplacer les 'href' par des 'to' pour le routing interne avec React Router
// Adapter ProfileDropDown pour qu'il s'intègre bien avec la structure existante

const ProfileDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Adapter la navigation selon vos besoins
  const profileOptions = [
    { title: "Dashboard", path: "/dashboard" },
    { title: "Settings", path: "/settings" },
    { title: "Log out", path: "/logout" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full focus:outline-none"
      >
        {/* Remplacer par l'avatar ou l'image de profil si disponible */}
        <img
          src="https://randomuser.me/api/portraits/men/46.jpg"
          alt="Profile"
          className="w-full h-full rounded-full"
        />
      </button>
      {isOpen && (
        <ul className="absolute right-0 w-48 mt-2 bg-white shadow-md rounded-md py-1">
          {profileOptions.map((option, index) => (
            <li key={index}>
              <Link
                to={option.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {option.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function Header() {
  // Votre state et logique existante peuvent rester inchangés
  const [menuState, setMenuState] = useState(false);

  const navigation = [
    { title: "Accueil", path: "/" },
    { title: "Bon plans", path: "/bonsplans" },
    { title: "Catégories", path: "/category" },
    { title: "Code Promos", path: "/codespromos" },
    // Ajouter d'autres liens de navigation selon vos besoins
  ];

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="-ml-2 mr-2 flex items-center md:hidden">
              {/* Bouton pour menu mobile */}
              <button
                onClick={() => setMenuState(!menuState)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img
                className="block lg:hidden h-8 w-auto"
                src={Logo}
                alt="Float UI"
              />
              <img className="block  h-16 w-auto" src={Logo} alt="Float UI" />
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {/* Items de navigation */}
              {navigation.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex-1 gap-x-6 items-center justify-end mt-6 space-y-6 md:flex md:space-y-0 md:mt-0">
            <Link
              to="/connexion"
              className="block text-gray-700 hover:text-gray-900"
            >
              Connexion
            </Link>
            <Link
              to="/inscription"
              className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
            >
              Inscription
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Contenu du menu mobile */}
      <div className={`${menuState ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navigation.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="text-gray-700 block px-3 py-2 rounded-md text-base font-medium"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
