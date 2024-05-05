import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Assurez-vous que le chemin est correct

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/connexion'); // Rediriger vers la page de connexion après déconnexion
  };

  // Si aucun utilisateur n'est connecté, redirigez ailleurs ou affichez un message
  if (!user) {
    navigate('/connexion');
    return <div>Loading...</div>;
  }

  // Utilisez les données réelles de votre utilisateur provenant du Context
  const userData = {
    nom: user.nom || "Nom d'utilisateur",
    email: user.email || "email@exemple.com",
    dateInscription: user.dateInscription || "Date d'inscription",
    imageUrl: user.imageUrl || "https://via.placeholder.com/150"
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={userData.imageUrl}
            alt="Profil"
            className="h-32 w-32 rounded-full border-4 border-gray-300"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-700">{userData.nom}</h1>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-500">Membre depuis: {userData.dateInscription}</p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700">Informations du Profil</h2>
          <ul className="list-disc space-y-2 pl-5 mt-4 text-gray-600">
            <li>Nom : {userData.nom}</li>
            <li>Email : {userData.email}</li>
            <li>Date d'inscription : {userData.dateInscription}</li>
          </ul>
        </div>
        <div className="mt-8 flex space-x-4">
          <Link
            to="/edit-profile"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Modifier le profil
          </Link>
          <Link
            to="/change-password"
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Changer de mot de passe
          </Link>  {user.isadmin && ( 
            <Link
              to="/admin"
              className="text-green-600 hover:text-green-800 font-medium"
            >
              Admin Page
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}
