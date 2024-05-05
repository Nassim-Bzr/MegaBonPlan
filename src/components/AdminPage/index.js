import React, { useState, useEffect } from 'react';
import { useAuth } from "../../AuthContext"; // Assurez-vous que le chemin est correct

export default function AdminPage() {
  const [pendingBonPlans, setPendingBonPlans] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user && user.isadmin) {
      fetch('http://localhost:8080/api/bonplans/pending') // Utiliser le nouvel endpoint
      .then(response => response.json())
      .then(data => {
          console.log(data);  // Vérifier la structure de la donnée reçue
          if (Array.isArray(data)) {  // Assurer que la donnée est un tableau
              setPendingBonPlans(data);
          } else {
              setPendingBonPlans([]);  // S'assurer que pendingBonPlans est toujours un tableau
          }
      })
      .catch(error => {
          console.error('Erreur lors de la récupération des bons plans:', error);
          setPendingBonPlans([]);  // Gérer les erreurs en initialisant avec un tableau vide
      });
      
    }
  }, [user]);

  const handleApprove = (bonPlanId) => {
    fetch(`http://localhost:8080/api/bonplans/${bonPlanId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ApprouveParAdmin: true })
    })
    .then(response => response.json())
    .then(() => {
      setPendingBonPlans(pendingBonPlans.filter(bonPlan => bonPlan.ID_BonPlan !== bonPlanId));
    })
    .catch(error => console.error('Erreur lors de lapprobation du bon plan:', error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center mb-6">Administration des Bons Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingBonPlans.map((bonPlan, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-blue-800">{bonPlan.Titre}</h2>
            <p className="text-gray-600">{bonPlan.Description}</p>
            <button
              onClick={() => handleApprove(bonPlan.ID_BonPlan)}
              className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Approuver
            </button>
          </div>
        ))}
        {pendingBonPlans.length === 0 && (
          <p className="text-center text-gray-600">Aucun bon plan en attente d'approbation.</p>
        )}
      </div>
    </div>
  );
}
