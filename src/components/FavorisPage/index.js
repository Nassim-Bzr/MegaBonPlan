import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FavoritesPage() {
  const [favoris, setFavoris] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/favoris')
      .then((response) => response.json())
      .then(setFavoris)
      .catch(console.error);
  }, []);

  const removeFavori = (idFavori) => {
    fetch(`http://localhost:8080/api/favoris/${idFavori}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        // Filtrer le favori supprimé hors de l'état local pour mettre à jour l'interface utilisateur
        setFavoris(favoris.filter(favori => favori.id_favoris !== idFavori));
      } else {
        alert('Échec de la suppression du favori');
      }
    })
    .catch(error => console.error('Erreur lors de la suppression du favori:', error));
  };

  return (
    <div className="min-h-screen animatedBackground bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-white text-center text-white-800 mb-6">
        Mes bon plans favoris
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoris.length > 0 ? (
          favoris.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <img
                src={item.imglink}
                alt={item.Titre}
                className="w-full h-40 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold text-blue-800">
                {item.Titre}
              </h2>
              <p className="text-gray-600">{item.Description}</p>
              <Link
                to={item.LienAffiliation}
                className="text-indigo-500 hover:text-indigo-600 transition-colors mt-2 inline-block"
              >
                Voir plus
              </Link>
              <button
                onClick={() => removeFavori(item.id_favoris)}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Retirer des favoris
              </button>
            </div>
          ))
        ) : (
          <p className="text-center flex justify-center text-white mr-auto text-2xl mt-3">Aucun favori enregistré.</p>
        )}
      </div>
    </div>
  );
}
