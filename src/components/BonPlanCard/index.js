// BonPlanCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import './bonplancard.css';
import { useAuth } from '../../AuthContext';

const BonPlanCard = ({ bonPlan, user }) => {
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

  const handleLike = async () => {
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
        alert('Bon plan liké avec succès!');
        // Vous pouvez mettre à jour l'état des bon plans ici pour refléter le like
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
          <img src={bonPlan.imglink} alt={bonPlan.titre} className="w-full h-40 object-cover mb-4 rounded-md" />
          <p className="text-gray-700">{bonPlan.description}</p>
          <p className="text-gray-400 text-sm">
            Posté il y a: {timeSince(bonPlan.datepost)}
          </p>
          <p className="text-gray-700 font-bold">
            Prix initial: {bonPlan.prix_initial}€
          </p>
          <p className="text-red-500 font-bold">
            Prix réduit: {bonPlan.prix_reduit}€
          </p>
          <p className="text-green-500 font-bold">
            Réduction: {calculateDiscount(bonPlan.prix_initial, bonPlan.prix_reduit).toFixed(2)}%
          </p>
          <p className="text-gray-700 font-bold">
            Likes: {bonPlan.likes}
          </p>
        </div>
      </Link>
      <button onClick={handleLike} className="flex relative center" aria-label="Liker le bon plan">
        Liker
      </button>
    </div>
  );
};

export default BonPlanCard;
