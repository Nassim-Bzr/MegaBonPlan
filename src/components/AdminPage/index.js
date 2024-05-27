import React, { useState, useEffect } from 'react'
import { useAuth } from '../../AuthContext' // Assurez-vous que le chemin est correct

export default function AdminPage() {
  const [pendingBonPlans, setPendingBonPlans] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user && user.isadmin) {
      fetch('https://megabonplan-f8522b195111.herokuapp.com/api/bonplans/pending')
        .then((response) => response.json())
        .then((data) => {
          console.log('Données reçues pour les bons plans en attente :', data)
          if (Array.isArray(data)) {
            setPendingBonPlans(data)
          } else {
            console.error("La réponse n'est pas un tableau :", data)
            setPendingBonPlans([])
          }
        })
        .catch((error) => {
          console.error('Erreur lors de la récupération des bons plans:', error)
          setPendingBonPlans([])
        })
    }
  }, [user])

  const handleApprove = (id) => {
    fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/bonplans/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approuvéparadmin: true }),
    })
      .then((response) => response.json())
      .then(() => {
        setPendingBonPlans(
          pendingBonPlans.filter((bonPlan) => bonPlan.id_bonplan !== id)
        )
      })
      .catch((error) =>
        console.error('Erreur lors de lapprobation du bon plan:', error)
      )
  }

  return (
    <div className="min-h-screen animatedBackground bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-10 text-white">
        Administration des Bons Plans
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pendingBonPlans.map((bonPlan, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out"
          >
            <h2 className="text-2xl font-semibold text-blue-900 mb-2">
              {bonPlan.titre}
            </h2>
            <p className="text-white mb-4">{bonPlan.description}</p>
            <button
              onClick={() => handleApprove(bonPlan.id_bonplan)}
              className="mt-auto bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Approuver
            </button>
          </div>
        ))}
        {pendingBonPlans.length === 0 && (
          <p className="text-center text-lg text-white col-span-full">
            Aucun bon plan en attente d'approbation.
          </p>
        )}
      </div>
    </div>
  )
}
