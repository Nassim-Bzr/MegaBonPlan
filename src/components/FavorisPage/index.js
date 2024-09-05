import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaExternalLinkAlt, FaRegSadTear, FaHeart, FaComment } from 'react-icons/fa';

export default function FavoritesPage() {
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('https://megabonplan-f8522b195111.herokuapp.com/api/favoris')
      .then((response) => response.json())
      .then((data) => {
        setFavoris(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des favoris:', error);
        setLoading(false);
      });
  }, []);

  const removeFavori = (idFavori) => {
    fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/favoris/${idFavori}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setFavoris(favoris.filter(favori => favori.id_favoris !== idFavori));
      } else {
        alert('Échec de la suppression du favori');
      }
    })
    .catch(error => console.error('Erreur lors de la suppression du favori:', error));
  };

  if (loading) {
    return (
      <div className="min-h-screen animatedBackground flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animatedBackground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white text-center mb-10">
          Mes Bons Plans Favoris
        </h1>
        {favoris.length === 0 ? (
          <div className="text-center text-white bg-gray-800 bg-opacity-50 rounded-lg p-8 max-w-md mx-auto">
            <FaRegSadTear className="mx-auto text-4xl mb-4" />
            <p className="text-xl font-semibold mb-2">Aucun favori enregistré pour l'instant.</p>
            <p className="text-gray-300">Explorez nos bons plans et ajoutez-en à vos favoris !</p>
            <Link to="/bonsplans" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Découvrir les bons plans
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoris.map((item) => (
              <div key={item.id_favoris} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <img
                  src={item.imglink}
                  alt={item.Titre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 truncate">
                    {item.Titre}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{item.Description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                    <span className="flex items-center"><FaHeart className="mr-1" /> {item.likes || 0}</span>
                    <span className="flex items-center"><FaComment className="mr-1" /> {item.comments || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      to={item.LienAffiliation}
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center transition duration-300"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Voir l'offre <FaExternalLinkAlt className="ml-1" />
                    </Link>
                    <button
                      onClick={() => removeFavori(item.id_favoris)}
                      className="text-red-500 hover:text-red-700 font-medium flex items-center transition duration-300"
                    >
                      Retirer <FaTrash className="ml-1" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
