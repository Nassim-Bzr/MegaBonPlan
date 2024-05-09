// BonPlans.js

import React, { useState, useEffect } from 'react'
import './bonplans.css'
import { Link } from 'react-router-dom'
import BonPlanCard from '../BonPlanCard/index'
import { useAuth } from '../../AuthContext' // Assurez-vous que le chemin est correct

export default function BonPlans() {
  const [bonPlans, setBonPlans] = useState([])
  const { user } = useAuth()
  useEffect(() => {
    fetch('http://localhost:8080/api/bonplans')
      .then((response) => response.json())
      .then((data) => {
        const filteredPlans = data.filter((bonPlan) => bonPlan.ApprouveParAdmin)
        setBonPlans(filteredPlans)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des bons plans:', error)
      })
  }, [])

  return (
    <div className="py-8 px-4 animatedBackground">
      <h2 className="text-4xl font-bold text-center text-white mb-10">
        Découvrez les Bons Plans
      </h2>
      <div className="max-w-screen-xl mx-auto bg-white animatedBackground grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bonPlans.map((bonPlan, index) => (
          <BonPlanCard key={index} bonPlan={bonPlan}  user={user} />
        ))}
      </div>
    </div>
  )
}
