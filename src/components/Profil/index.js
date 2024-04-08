import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Assurez-vous que le chemin est correct

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Remplacez cette logique par les données réelles de votre utilisateur
  const userData = user ? {
    nom: user.name, // Ici, 'name' devrait correspondre à la propriété de votre objet utilisateur
    email: "exemple@domaine.com", // Cette valeur est juste un placeholder
    dateInscription: "01/01/2020", // Cette valeur est juste un placeholder
  } : {};

  const handleLogout = () => {
    logout(); // Utilisez la fonction de déconnexion de votre contexte d'authentification
    navigate('/'); // Redirige l'utilisateur vers la page d'accueil
  };

  return (
    <div className="profile-container bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <main className="w-full max-w-4xl mx-auto p-8 bg-white rounded-lg shadow">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src=""
            alt="Profil"
            className="h-32 w-32 rounded-full mx-auto md:mx-0 md:mr-8"
          />
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">{userData.nom}</h2>
            <p className="text-gray-600">{userData.email}</p>
            <p className="text-gray-500">Membre depuis: {userData.dateInscription}</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Informations du Profil</h3>
          <ul className="list-disc pl-5">
            <li>Nom : {userData.nom}</li>
            <li>Email : {userData.email}</li>
            <li>Date d'inscription : {userData.dateInscription}</li>
          </ul>
        </div>
        <div className="mt-8">
          <Link
            to="/edit-profile"
            className="text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Modifier le profil
          </Link>
        </div>
        <div className="mt-4">
          <Link
            to="/change-password"
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Changer de mot de passe
          </Link>
          <button onClick={handleLogout} className="ml-4 text-red-600 hover:text-red-800 font-medium">Déconnexion</button>
        </div>
      </main>
    </div>
  );
}
