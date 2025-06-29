import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { FaCheck, FaTimes, FaExclamationTriangle } from 'react-icons/fa';

export default function AdminPage() {
  const [pendingBonPlans, setPendingBonPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.isadmin) {
      setLoading(true);
      fetch('http://localhost:8080/api/bonplans/pending')
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setPendingBonPlans(data);
          } else {
            throw new Error("La réponse n'est pas un tableau");
          }
        })
        .catch((error) => {
          console.error('Erreur:', error);
          setError("Une erreur est survenue lors du chargement des bons plans");
        })
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/bonplans/${id}`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ approuvéparadmin: true }),
      });

      if (response.ok) {
        setPendingBonPlans(pendingBonPlans.filter((bonPlan) => bonPlan.id_bonplan !== id));
      } else {
        throw new Error('Erreur lors de l\'approbation');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Une erreur est survenue lors de l\'approbation du bon plan');
    }
  };

  const handleReject = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir rejeter ce bon plan ?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/bonplans/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (response.ok) {
          setPendingBonPlans(pendingBonPlans.filter((bonPlan) => bonPlan.id_bonplan !== id));
        } else {
          throw new Error('Erreur lors du rejet');
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors du rejet du bon plan');
      }
    }
  };

  if (!user?.isadmin) {
    return (
      <div className="min-h-screen animatedBackground flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-center text-red-500">Accès non autorisé</h1>
          <p className="text-gray-600 text-center mt-2">Vous n'avez pas les droits d'administration nécessaires.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen animatedBackground flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen animatedBackground flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <FaExclamationTriangle className="text-red-500 text-5xl mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-center text-red-500">Erreur</h1>
          <p className="text-gray-600 text-center mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen animatedBackground p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/90 rounded-lg shadow-xl p-6 mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard Administrateur</h1>
          <p className="text-gray-600">
            {pendingBonPlans.length} bon{pendingBonPlans.length !== 1 ? 's' : ''} plan{pendingBonPlans.length !== 1 ? 's' : ''} en attente de validation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pendingBonPlans.map((bonPlan) => (
            <div key={bonPlan.id_bonplan} className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              {bonPlan.imglink && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={bonPlan.imglink} 
                    alt={bonPlan.titre}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{bonPlan.titre}</h2>
                <div className="flex items-center text-gray-600 mb-2">
                  <span className="font-semibold">Prix: </span>
                  <span className="ml-2 text-red-500 font-bold">{bonPlan.prix_reduit}€</span>
                  {bonPlan.prix_initial && (
                    <span className="ml-2 line-through text-gray-400">{bonPlan.prix_initial}€</span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{bonPlan.description}</p>
                <div className="flex items-center justify-between mt-4">
                  <button
                    onClick={() => handleApprove(bonPlan.id_bonplan)}
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <FaCheck className="mr-2" />
                    Approuver
                  </button>
                  <button
                    onClick={() => handleReject(bonPlan.id_bonplan)}
                    className="flex items-center px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <FaTimes className="mr-2" />
                    Rejeter
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {pendingBonPlans.length === 0 && (
          <div className="bg-white/90 rounded-lg shadow-xl p-8 text-center">
            <FaCheck className="text-green-500 text-5xl mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Tout est à jour !</h2>
            <p className="text-gray-600">Aucun bon plan n'est en attente de validation.</p>
          </div>
        )}
      </div>
    </div>
  );
}
