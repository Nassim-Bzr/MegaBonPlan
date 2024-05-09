import React from 'react';
import { Link } from 'react-router-dom'; // Importer Link pour le routing
import './bonplancard.css';
import { useAuth } from '../../AuthContext'
const BonPlanCard = ({ bonPlan, user }) => {
  // Fonction pour ajouter aux favoris
 console.log(user)
 console.log("User ID:", user?.token.id_utilisateur); // Ceci vous permettra de voir si l'ID est récupéré correctement

 const addToFavorites = (bonPlanId) => {
  // Assurez-vous que l'utilisateur est connecté et que l'ID est disponible
  if (!user || !user.token.id_utilisateur) {
    alert('Vous devez être connecté pour ajouter des favoris.');
    return;
  }

  const requestBody = {
    id_utilisateur: user.token.id_utilisateur, // Vérifiez que cet ID est bien présent et correct
    id_bonplan: bonPlanId,
  };

  fetch('http://localhost:8080/api/favoris', {
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

  
  

  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 relative">
      <Link to={`/bonplans/details/${bonPlan.ID_BonPlan}`} className="block">
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800">{bonPlan.Titre}</h3>
          <img src={bonPlan.imglink} alt={bonPlan.Titre} className="w-full h-40 object-cover mb-4 rounded-md" />
          <p className="text-gray-700">{bonPlan.Description}</p>
          <p className="text-gray-400 text-sm">
            Posté le: {new Date(bonPlan.DatePost).toLocaleDateString()}
          </p>
        </div>
      </Link>
      <button
        onClick={() => addToFavorites(bonPlan.ID_BonPlan)}
        className="absolute top-2 right-2 p-2 rounded-full bg-blue-500 hover:bg-blue-700 text-white"
        aria-label="Ajouter aux favoris"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 18.364l-1.061 1.06A1.5 1.5 0 012 18.364V5.636C2 4.733 2.734 4 3.636 4h12.728c.902 0 1.636.733 1.636 1.636v6.364M7.05 9V5.636C7.05 4.733 7.783 4 8.686 4h6.364c.903 0 1.636.733 1.636 1.636V9m0 0l3.428 3.428m0 0l.849-4.25m-.849 4.25V19.364c0 .902-.733 1.636-1.636 1.636H5.636A1.636 1.636 0 014 19.364v-6.75m3.05-3.09h10.9" />
        </svg>
      </button>
    </div>
  );
};

export default BonPlanCard;
