import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Votre texte de paragraphe.png";
import { useAuth } from "../../AuthContext"; // Assurez-vous d'ajuster le chemin selon votre structure de dossier

const Header = () => {
  const [state, setState] = useState(false);
  const { user } = useAuth(); // Utilisation du hook useAuth pour accéder à l'état de connexion

  // Écoutez les clics en dehors des éléments du menu pour fermer le menu sur mobile
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest(".menu-btn") && !e.target.closest(".menu")) {
        setState(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const navigation = [
    { title: "Catégories", path: "/category" },
    { title: "Bon Plans", path: "/bonsplans" },
    { title: "Codes Promos", path: "/codespromos" },
    { title: "Discussions", path: "/discussions" },
    { title: "Contact", path: "/contact" },
    { title: "FAQ", path: "/faq" },
  ];

  return (
    <nav className={`bg-white md:text-sm ${state ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0" : ""}`}>
      <div className="max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex justify-between items-center py-3 md:py-5">
          <Link to="/">
            <img src={Logo} alt="Logo" width={120} height={50} />
          </Link>
          <button className="menu-btn md:hidden" onClick={() => setState(!state)}>
            {/* Icône du menu ici */}
          </button>
        </div>
        <div className={`flex-1 ${state ? "block" : "hidden"} md:flex md:items-center md:justify-between`}>
          <ul className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {navigation.map((item, index) => (
              <li key={index}>
                <Link to={item.path} className="text-gray-700 hover:text-gray-900">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Bonjour, {user.name}</span>
              <Link to="/profil" className="py-2 px-4 text-white bg-blue-500 hover:bg-blue-700 rounded">
                Profil
              </Link>
            </div>
          ) : (
            <div className="mt-4 md:mt-0">
              <Link to="/connexion" className="mr-4">Connexion</Link>
              <Link to="/inscription" className="py-2 px-4 text-white bg-blue-500 hover:bg-blue-700 rounded">
                Inscription
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
