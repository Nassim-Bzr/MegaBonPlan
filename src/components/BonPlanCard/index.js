import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaComment, FaStar, FaClock, FaThermometerHalf } from 'react-icons/fa';

const BonPlanCard = ({ bonPlan, user }) => {
  const [likes, setLikes] = useState(bonPlan.likes);
  const [liked, setLiked] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user && bonPlan.likes) {
      fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/bonplans/liked/${bonPlan.id_bonplan}/${user.id}`)
        .then(response => response.json())
        .then(data => {
          if (data.liked) setLiked(true);
        })
        .catch(error => console.error('Erreur lors de la vérification du like:', error));
    }
  }, [user, bonPlan]);

  useEffect(() => {
    fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/utilisateur/${bonPlan.id_utilisateur}`)
      .then(response => response.json())
      .then(data => setAuthorName(data.nom))
      .catch(error => console.error('Erreur lors de la récupération de l\'auteur:', error));
  }, [bonPlan.id_utilisateur]);

  useEffect(() => {
    if (user) {
      fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/favoris/check/${bonPlan.id_bonplan}/${user.id}`)
        .then(response => response.json())
        .then(data => setIsFavorite(data.isFavorite))
        .catch(error => console.error('Erreur lors de la vérification des favoris:', error));
    }
  }, [user, bonPlan]);

  const calculateDiscount = (initialPrice, reducedPrice) => {
    return ((initialPrice - reducedPrice) / initialPrice) * 100;
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

  const handleLike = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Vous devez être connecté pour liker un bon plan.');
      return;
    }
    // Action de like
  };

  const handleFavorite = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Vous devez être connecté pour ajouter un bon plan aux favoris.');
      return;
    }
    // Action de favori
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex transition hover:shadow-xl">
      <div className="w-1/4">
        <img src={bonPlan.imglink} alt={bonPlan.titre} className="w-full h-full object-cover rounded-md" />
      </div>
      <div className="w-3/4 pl-6 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="flex items-center text-red-600 font-bold text-lg">
              <FaThermometerHalf className="mr-2" /> {likes}°
            </span>
            <span className="flex items-center text-gray-500 text-sm">
              <FaClock className="mr-1" /> {timeSince(bonPlan.datepost)}
            </span>
          </div>
          <h3 className="text-xl font-semibold mb-2">{bonPlan.titre}</h3>
          <div className="text-lg mb-2 flex items-center">
            <span className="text-red-500 font-bold mr-2">{bonPlan.prix_reduit}€</span>
            <span className="line-through text-gray-500 mr-2">{bonPlan.prix_initial}€</span>
            <span className="text-green-500 font-bold">-{calculateDiscount(bonPlan.prix_initial, bonPlan.prix_reduit).toFixed(2)}%</span>
          </div>
          <p className="text-gray-700 mb-4">{bonPlan.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <button 
            onClick={handleLike} 
            className={`flex items-center ${liked ? 'text-red-600' : 'text-gray-500'} transition`}>
            <FaHeart className="mr-2" /> {likes}
          </button>
          <Link to={`/bonplans/details/${bonPlan.id_bonplan}`} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Voir le deal
          </Link>
          <button 
            onClick={handleFavorite} 
            className={`flex items-center ${isFavorite ? 'text-yellow-500' : 'text-gray-500'} transition`}>
            <FaStar className="mr-2" /> {isFavorite ? 'Favori' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BonPlanCard;
