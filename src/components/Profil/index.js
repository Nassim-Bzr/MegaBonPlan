import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import { useAuth } from '../../AuthContext'; // Assurez-vous que le chemin est correct

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("test", user);

  const DeleteAccount = () => {
    fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/utilisateur/${user.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Compte supprimé avec succès:', data);
        logout();
        navigate('/connexion');
      })
      .catch((error) => console.error('Erreur lors de la suppression du compte:', error));
  };

  const handleLogout = () => {
    logout();
    navigate('/connexion'); // Rediriger vers la page de connexion après déconnexion
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Si aucun utilisateur n'est connecté, redirigez ailleurs ou affichez un message
  if (!user) {
    navigate('/connexion');
    return <div>Loading...</div>;
  }

  // Utilisez les données réelles de votre utilisateur provenant du Context
  const userData = {
    nom: user.nom || "Nom d'utilisateur",
    email: user.email || 'email@exemple.com',
    dateinscription: user.dateinscription || "Date d'inscription",
    imageUrl: user.imageUrl || 'https://via.placeholder.com/150',
  };

  return (
    <div className="bg-gray-100 min-h-screen animatedBackground flex items-center justify-center">
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
            <p className="text-gray-500">
              Membre depuis: {userData.dateinscription}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-700">
            Informations du Profil
          </h2>
          <ul className="list-disc list-none space-y-2 pl-5 mt-4 text-gray-600">
            <li>Nom : {userData.nom}</li>
            <li>Email : {userData.email}</li>
            <li>Date d'inscription : {userData.dateinscription}</li>
          </ul>
        </div>
        <div className="mt-8 flex space-x-4">
          <Link
            to="/modifier-profil"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Modifier le profil
          </Link>
          <Link
            to="/change-password"
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Changer de mot de passe
          </Link>{' '}
          {user.isadmin && (
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
          <button
            onClick={openModal}
            className="text-red-600 hover:text-red-800 font-medium"
          >
            Supprimer le compte
          </button>
        </div>
      </div>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation de suppression de compte"
        className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto my-16"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-4">Confirmer la suppression</h2>
        <p className="mb-4">
          Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
          irréversible.
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              DeleteAccount();
              closeModal();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </ReactModal>
    </div>
  );
}
