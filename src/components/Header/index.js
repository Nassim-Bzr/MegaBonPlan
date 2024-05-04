import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Votre texte de paragraphe.png";  // Assurez-vous que le chemin vers le logo est correct
import { useAuth } from "../../AuthContext"; // Assurez-vous que le chemin d'accès à AuthContext est correct

const Header = () => {
  const { user, logout } = useAuth();

  console.log(user)
  const handleLogout = () => {
    logout();  // Déconnexion de l'utilisateur via AuthContext
  };

  return (
    <nav className="bg-white md:text-sm shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0">
      <div className="max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex justify-between items-center py-3 md:py-5">
          <Link to="/">
            <img src={Logo} alt="Logo" width={120} height={50} />
          </Link>
          <button className="md:hidden">
            {/* Icône du menu ici si nécessaire */}
          </button>
        </div>
        <div className="flex-1 md:flex md:items-center md:justify-between">
          <ul className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {[
              { title: "Catégories", path: "/category" },
              { title: "Bon Plans", path: "/bonsplans" },
              { title: "Codes Promos", path: "/codespromos" },
              { title: "Discussions", path: "/discussions" },
              { title: "Contact", path: "/contact" },
              { title: "FAQ", path: "/faq" },
            ].map((item, index) => (
              <li key={index}>
                <Link to={item.path} className="text-gray-700 hover:text-gray-900">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Bonjour, {user.nom}</span> {/* Affiche le nom de l'utilisateur */}
              <Link to="/profil" className="py-2 px-4 text-white bg-blue-500 hover:bg-blue-700 rounded">
                Profil
              </Link>
              <button onClick={handleLogout} className="py-2 px-4 text-white bg-red-500 hover:bg-red-700 rounded">
                Déconnexion
              </button>
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
