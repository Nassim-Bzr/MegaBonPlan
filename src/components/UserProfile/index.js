import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import BonPlanCard from '../BonPlanCard';

export default function UserProfile() {
  const [userBonPlans, setUserBonPlans] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8080/api/bonplans/user/${user.id}`)
        .then(res => res.json())
        .then(data => {
          setUserBonPlans(data);
        })
        .catch(error => {
          console.error('Erreur lors de la récupération des bons plans de l\'utilisateur:', error);
        });
    }
  }, [user]);

  return (
    <div className="py-8 px-4 animatedBackground">
      <h1 className="text-4xl font-bold text-center text-white mb-6">
        Mes Bons Plans
      </h1>

      <div className="max-w-screen-xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {userBonPlans.map((bonPlan) => (
          <div key={bonPlan.id_bonplan} className="relative">
            <BonPlanCard bonPlan={bonPlan} user={user} />
            <div className={`absolute top-0 right-0 p-2 text-white font-bold ${
              bonPlan.approuvéparadmin ? 'bg-green-500' : 'bg-yellow-500'
            }`}>
              {bonPlan.approuvéparadmin ? 'Validé' : 'En attente'}
            </div>
          </div>
        ))}
      </div>

      {userBonPlans.length === 0 && (
        <p className="text-center text-2xl text-gray-300 mt-8">
          Vous n'avez pas encore posté de bons plans.
        </p>
      )}
    </div>
  );
}