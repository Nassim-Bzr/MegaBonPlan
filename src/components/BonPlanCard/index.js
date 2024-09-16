import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaComment, FaStar } from 'react-icons/fa';
import './bonplancard.css'

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

  useEffect(() => {
    if (user) {
      fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/favoris/check/${bonPlan.id_bonplan}/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setIsFavorite(data.isFavorite);
        })
        .catch(error => console.error('Erreur lors de la vérification des favoris:', error));
    }
  }, [user, bonPlan]);

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

  const handleFavorite = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('Vous devez être connecté pour ajouter un bon plan aux favoris.');
      return;
    }

    try {
      const response = await fetch('https://megabonplan-f8522b195111.herokuapp.com/api/favoris', {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_bonplan: bonPlan.id_bonplan, id_utilisateur: user.id }),
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
        alert(isFavorite ? 'Bon plan retiré des favoris!' : 'Bon plan ajouté aux favoris!');
      } else {
        const data = await response.json();
        alert(data.message || 'Erreur lors de la modification des favoris.');
      }
    } catch (error) {
      console.error('Erreur lors de la modification des favoris:', error);
      alert('Erreur lors de la modification des favoris.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row rounded-xl shadow-lg p-3 bg-white w-full max-w-4xl mx-auto mb-8">
      <div className="w-full md:w-2/5 flex-shrink-0">
        <div className="h-64 md:h-full w-full relative overflow-hidden rounded-xl">
          <img 
            src={bonPlan.imglink} 
            alt={bonPlan.titre} 
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        </div>
      </div>
      <div className="w-full md:w-3/5 flex flex-col space-y-2 p-3">
        <div className="flex justify-between items-center">
          <p className="text-gray-500 font-medium hidden md:block">{bonPlan.categorie}</p>
          <div className="flex items-center">
            <FaStar className="h-5 w-5 text-yellow-500" />
            <p className="text-gray-600 font-bold text-sm ml-1">
              {likes} <span className="text-gray-500 font-normal">({bonPlan.commentaires ? bonPlan.commentaires.length : 0} avis)</span>
            </p>
          </div>
          <button 
            onClick={handleFavorite}
            className={`${isFavorite ? 'text-pink-500' : 'text-gray-300'} hover:text-pink-500 transition-colors duration-200`}
          >
            <FaHeart className="h-5 w-5" />
          </button>
        </div>
        <h3 className="font-black text-gray-800 md:text-xl text-xl truncate">{bonPlan.titre}</h3>
        <p className="md:text-sm text-gray-500 text-base line-clamp-2">{bonPlan.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-xl font-black text-gray-800">
            {bonPlan.prix_reduit}€
            <span className="font-normal text-gray-600 text-base line-through ml-2">{bonPlan.prix_initial}€</span>
          </p>
          <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            -{calculateDiscount(bonPlan.prix_initial, bonPlan.prix_reduit)}%
          </div>
        </div>
        <div className="flex justify-between items-center mt-3">
          <p className="text-sm text-gray-500">Posté par: {authorName || 'Utilisateur inconnu'}</p>
          <p className="text-sm text-gray-500">Il y a {timeSince(bonPlan.datepost)}</p>
        </div>
        <Link 
          to={`/bonplans/details/${bonPlan.id_bonplan}`} 
          className="mt-2 px-4 py-2 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          Voir les détails
        </Link>
      </div>
    </div>
  );
};

export default BonPlanCard;
