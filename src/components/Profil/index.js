import React from "react";
import { Link } from "react-router-dom";


export default function Profile() {
  // Données utilisateur fictives
  const userData = {
    nom: "John Doe",
    email: "john.doe@example.com",
    dateInscription: "01/01/2020",
    // Ajoutez d'autres données que vous souhaitez afficher
  };

  return (
    <div className="profile-container bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      <main className="w-full max-w-4xl mx-auto p-8 bg-white rounded-lg shadow">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src=""
            alt="Profile"
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
            {/* Ajoutez d'autres informations si nécessaire */}
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
        </div>
      </main>
    </div>
  );
}
