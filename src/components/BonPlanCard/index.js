// BonPlanCard.js
import React from 'react'
import { Link } from 'react-router-dom' // Importer Link pour le routing
import './bonplancard.css'

const BonPlanCard = ({ bonPlan }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 relative">
      <Link to={`/bonplans/details/${bonPlan.ID_BonPlan}`} className="block">
        {' '}
        {/* Modifier le chemin */}
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 pb-2 ">{bonPlan.Titre}</h3>
          <img
            src={bonPlan.imglink}
            alt={bonPlan.Titre}
            className="w-full h-40 object-cover mb-4 rounded-md"
          />
          <p className="text-gray-700 mt-2">{bonPlan.Description}</p>
          <p className="text-gray-400 text-sm mt-2">
            Posté le: {new Date(bonPlan.DatePost).toLocaleDateString()}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default BonPlanCard
