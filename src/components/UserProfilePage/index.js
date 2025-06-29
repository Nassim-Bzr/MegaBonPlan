import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaUser, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt, FaStar, FaHeart, FaRegClock, FaComment } from 'react-icons/fa';

const UserProfilePage = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userComments, setUserComments] = useState([]);

  useEffect(() => {
    // Remplacez cette URL par l'URL de votre API pour récupérer les données utilisateur
    fetch(`http://localhost:8080/api/utilisateur/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUserData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    // Remplacez cette URL par l'URL de votre API pour récupérer les commentaires de l'utilisateur
    fetch(`http://localhost:8080/api/commentaires/user/${userId}`)
      .then(response => response.json())
      .then(data => {
        setUserComments(data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des commentaires de l\'utilisateur:', error);
      });
  }, [userId]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!userData) {
    return <div>Utilisateur non trouvé</div>;
  }

  return (
    <div className="min-h-screen animatedBackground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center space-x-3 mb-4">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
            {userData.imageUrl ? (
              <img
                src={userData.imageUrl}
                alt="Profile"
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <FaUser className="text-gray-400 text-xl" />
            )}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{userData.nom}</h1>
            <p className="text-gray-600 text-sm"><FaMapMarkerAlt className="inline mr-1 text-sm" /> Paris, France</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-100 p-3 rounded-lg shadow">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Informations de base</h2>
            <p className="text-gray-600 text-sm"><FaEnvelope className="inline mr-1 text-sm" /> {userData.email}</p>
            <p className="text-gray-600 text-sm"><FaCalendarAlt className="inline mr-1 text-sm" /> {userData.dateNaissance}</p>
          </div>
          <div className="bg-gray-100 p-3 rounded-lg shadow">
            <h2 className="text-lg font-bold text-gray-800 mb-1">Statistiques</h2>
            <p className="text-gray-600 text-sm"><FaStar className="inline mr-1 text-sm" /> 4.5/5 (200 avis)</p>
            <p className="text-gray-600 text-sm"><FaHeart className="inline mr-1 text-sm" /> 150 favoris</p>
            <p className="text-gray-600 text-sm"><FaRegClock className="inline mr-1 text-sm" /> Membre depuis 2 ans</p>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg shadow mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Bons Plans Postés</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Remplacez par les bons plans réels de l'utilisateur */}
            <div className="bg-white p-3 rounded-lg shadow">
              <h3 className="text-md font-bold text-gray-800">Bon Plan 1</h3>
              <p className="text-gray-600 text-sm">Description du bon plan 1...</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <h3 className="text-md font-bold text-gray-800">Bon Plan 2</h3>
              <p className="text-gray-600 text-sm">Description du bon plan 2...</p>
            </div>
            <div className="bg-white p-3 rounded-lg shadow">
              <h3 className="text-md font-bold text-gray-800">Bon Plan 3</h3>
              <p className="text-gray-600 text-sm">Description du bon plan 3...</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg shadow">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Derniers Commentaires</h2>
          <div className="space-y-3">
            {userComments.length > 0 ? (
              userComments.map((comment, index) => (
                <div key={index} className="bg-white p-3 rounded-lg shadow">
                  <p className="text-gray-600 text-sm"><FaComment className="inline mr-1 text-sm" /> {comment.text}</p>
                  <p className="text-gray-500 text-xs">Posté sur: {comment.bonPlanTitle}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-sm">Aucun commentaire posté pour l'instant.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;