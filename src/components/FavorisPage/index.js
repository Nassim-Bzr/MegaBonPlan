import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTrash, FaExternalLinkAlt, FaRegSadTear, FaHeart, FaComment, FaStar } from 'react-icons/fa';
import { useAuth } from '../../AuthContext';

export default function FavoritesPage() {
  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authorNames, setAuthorNames] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/api/favoris')
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

  useEffect(() => {
    const fetchAuthorNames = async () => {
      const names = {};
      for (const favori of favoris) {
        if (favori.id_utilisateur) {
          try {
            const response = await fetch(`http://localhost:8080/api/utilisateur/${favori.id_utilisateur}`);
            const data = await response.json();
            names[favori.id_utilisateur] = data.nom;
          } catch (error) {
            console.error('Erreur lors de la récupération de l\'auteur:', error);
          }
        }
      }
      setAuthorNames(names);
    };

    if (favoris.length > 0) {
      fetchAuthorNames();
    }
  }, [favoris]);

  const removeFavori = (idFavori) => {
    fetch(`http://localhost:8080/api/favoris/${idFavori}`, {
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

  const calculateDiscount = (initialPrice, reducedPrice) => {
    return ((initialPrice - reducedPrice) / initialPrice * 100).toFixed(0);
  };

  const timeSince = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const seconds = Math.floor((now - postDate) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval} ans`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} mois`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} jours`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} heures`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes`;
    return `${Math.floor(seconds)} secondes`;
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
          <div className="text-center text-white bg-gray-800 bg-opacity-50 rounded-lg p-4 max-w-sm mx-auto">
            <FaHeart className="mx-auto text-5xl mb-4" />
            <p className="text-lg font-semibold mb-2">Aucun favori enregistré pour l'instant.</p>
            <p className="text-gray-300">Explorez nos bons plans et ajoutez-en à vos favoris !</p>
            <Link to="/bonsplans" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
              Découvrir les bons plans
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {favoris.map((item) => (
              <div key={item.id_favoris} className="flex flex-col md:flex-row rounded-xl shadow-lg p-3 bg-white w-full max-w-4xl mx-auto mb-8">
                <div className="w-full md:w-2/5 flex-shrink-0">
                  <div className="h-64 md:h-full w-full relative overflow-hidden rounded-xl">
                    <img 
                      src={item.imglink} 
                      alt={item.Titre} 
                      className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
                <div className="w-full md:w-3/5 flex flex-col space-y-2 p-3">
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 font-medium hidden md:block">{item.categorie}</p>
                    <div className="flex items-center">
                      <FaStar className="h-5 w-5 text-yellow-500" />
                      <p className="text-gray-600 font-bold text-sm ml-1">
                        {item.likes || 0} <span className="text-gray-500 font-normal">({item.comments || 0} avis)</span>
                      </p>
                    </div>
                    <button 
                      onClick={() => removeFavori(item.id_favoris)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                  <h3 className="font-black text-gray-800 md:text-xl text-xl truncate">{item.Titre}</h3>
                  <p className="md:text-sm text-gray-500 text-base line-clamp-2">{item.Description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xl font-black text-gray-800">
                      {item.prix_reduit}€
                      <span className="font-normal text-gray-600 text-base line-through ml-2">{item.prix_initial}€</span>
                    </p>
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      -{calculateDiscount(item.prix_initial, item.prix_reduit)}%
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-3">
                    <Link to={`/user/${item.id_utilisateur}`} className="text-sm text-blue-500 hover:underline">
                      Posté par: {authorNames[item.id_utilisateur] || 'Utilisateur inconnu'}
                    </Link>
                    <p className="text-sm text-gray-500">Il y a {timeSince(item.datepost)}</p>
                  </div>
                  <Link 
                    to={`/bonplans/details/${item.id_bonplan}`} 
                    className="mt-2 px-4 py-2 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
                  >
                    Voir les détails
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
