import React from 'react';
import { Link } from 'react-router-dom'; // Importer Link pour le routing
import './bonplancard.css';
import { useAuth } from '../../AuthContext'
import { MdFavorite } from "react-icons/md";

const BonPlanCard = ({ bonPlan, user }) => {
  // Fonction pour ajouter aux favoris
 console.log(user)
 console.log("User ID:", user?.id); // Ceci vous permettra de voir si l'ID est récupéré correctement

 const addToFavorites = (bonPlanId) => {
  // Assurez-vous que l'utilisateur est connecté et que l'ID est disponible
  if (!user || !user.id) {
    alert('Vous devez être connecté pour ajouter des favoris.');
    return;
  }

  const requestBody = {
    id_utilisateur: user.id, // Vérifiez que cet ID est bien présent et correct
    id_bonplan: bonPlanId,
  };

  fetch('https://megabonplan-f8522b195111.herokuapp.com/api/favoris', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to add favorite');
    }
    return response.json();
  })
  .then(data => {
    alert('Bon plan ajouté aux favoris!');
  })
  .catch(error => {
    console.error('Erreur lors de l\'ajout aux favoris:', error);
    alert('Erreur lors de l\'ajout aux favoris.');
  });
};

  console.log(bonPlan)
  

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 relative">
      <Link to={`/bonplans/details/${bonPlan.id_bonplan}`} className="block">
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{bonPlan.Titre}</h3>
          <img src={bonPlan.imglink} alt={bonPlan.titre} className="w-full h-40 object-cover mb-4 rounded-md" />
          <p className="text-gray-700">{bonPlan.description}</p>
          <p className="text-gray-400 text-sm">
            Posté le: {new Date(bonPlan.datepost).toLocaleDateString()}
          </p>
        </div>
      </Link>
      <button
        onClick={() => addToFavorites(bonPlan.id_bonplan)}
        className="flex relative center"
        aria-label="Ajouter aux favoris"
      >
     
      </button>
    </div>
  );
};

export default BonPlanCard;
