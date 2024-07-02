import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaComment } from 'react-icons/fa';

const BonPlanCard = ({ bonPlan, user }) => {
  const [likes, setLikes] = useState(bonPlan.likes);
  const [liked, setLiked] = useState(false);
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    if (user && bonPlan.likes) {
      fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/bonplans/liked/${bonPlan.id_bonplan}/${user.id}`)
        .then(response => response.json())
        .then(data => {
          if (data.liked) {
            setLiked(true);
          }
        })
        .catch(error => console.error('Erreur lors de la vérification du like:', error));
    }
  }, [user, bonPlan]);

  useEffect(() => {
    fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/utilisateur/${bonPlan.id_utilisateur}`)
      .then(response => response.json())
      .then(data => {
        setAuthorName(data.nom);
      })
      .catch(error => console.error('Erreur lors de la récupération de l\'auteur:', error));
  }, [bonPlan.id_utilisateur]);

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

    try {
      const response = await fetch('https://megabonplan-f8522b195111.herokuapp.com/api/bonplans/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_bonplan: bonPlan.id_bonplan, id_utilisateur: user.id }),
      });

      if (response.ok) {
        setLiked(true);
        setLikes(likes + 1);
        alert('Bon plan liké avec succès!');
      } else {
        const data = await response.json();
        alert(data.message || 'Erreur lors du like du bon plan.');
      }
    } catch (error) {
      console.error('Erreur lors du like du bon plan:', error);
      alert('Erreur lors du like du bon plan.');
    }
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 relative">
      <Link to={`/bonplans/details/${bonPlan.id_bonplan}`} className="block">
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{bonPlan.titre}</h3>
          <img src={bonPlan.imglink} alt={bonPlan.titre} className="w-2/3 h-40 object-cover mt-4 mb-4 mx-auto rounded-md" />
          <p className="text-gray-700">{bonPlan.description}</p>
          <p className="text-gray-400 text-sm">
            Posté il y a: {timeSince(bonPlan.datepost)}
            <br />
            Par: {authorName || 'Utilisateur inconnu'}
          </p>
          <p className="text-gray-500 line-through font-bold">
            Prix initial: {bonPlan.prix_initial}€
          </p>
          <p className="text-red-500 font-bold">
            Prix réduit: {bonPlan.prix_reduit}€
          </p>
          <p className="text-green-500 font-bold">
           - {calculateDiscount(bonPlan.prix_initial, bonPlan.prix_reduit).toFixed(2)}%
          </p>
          <div className="flex items-center text-gray-700 font-bold mx-auto justify-center mt-4">
            <button 
              onClick={handleLike} 
              className={`flex items-center ${liked ? 'text-red-500' : 'text-gray-500'} hover:text-red-500 transition-colors duration-200`}
              disabled={liked}
            >
              <FaHeart className="mr-2" />
              {likes}
            </button>
            <FaComment className="text-gray-500 ml-4 mr-2" />
            {bonPlan.commentaires ? bonPlan.commentaires.length : 0}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BonPlanCard;
