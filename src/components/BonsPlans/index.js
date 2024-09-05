// BonPlans.js

import React, { useState, useEffect } from 'react'
import './bonplans.css'
import { Link } from 'react-router-dom'
import BonPlanCard from '../BonPlanCard/index'
import { useAuth } from '../../AuthContext' // Assurez-vous que le chemin est correct
import { FaFilter, FaSortAmountDown } from 'react-icons/fa'

export default function BonPlans() {
  const [bonPlans, setBonPlans] = useState([])
  const [filteredBonPlans, setFilteredBonPlans] = useState([])
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const { user } = useAuth()

  useEffect(() => {
    Promise.all([
      fetch('https://megabonplan-f8522b195111.herokuapp.com/api/bonplans').then(res => res.json()),
      fetch('https://megabonplan-f8522b195111.herokuapp.com/api/categories').then(res => res.json())
    ]).then(([bonPlansData, categoriesData]) => {
      const filteredPlans = bonPlansData.filter((bonPlan) => bonPlan.approuvéparadmin)
      setBonPlans(filteredPlans)
      setFilteredBonPlans(filteredPlans)
      setCategories(categoriesData)
    }).catch(error => {
      console.error('Erreur lors de la récupération des données:', error)
    })
  }, [])

  useEffect(() => {
    let result = [...bonPlans]
    if (selectedCategory) {
      result = result.filter(plan => plan.id_categorie === parseInt(selectedCategory))
    }
    if (sortBy === 'price') {
      result.sort((a, b) => a.prix_reduit - b.prix_reduit)
    } else if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.datepost) - new Date(a.datepost))
    }
    setFilteredBonPlans(result)
  }, [selectedCategory, sortBy, bonPlans])

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleSortChange = (e) => {
    setSortBy(e.target.value)
  }

  console.log(bonPlans)
  return (
    <div className="py-8 px-4 animatedBackground">
      <h1 className="text-4xl font-bold text-center text-white mb-6">
        Découvrez les Bons Plans
      </h1>

      {!user && (
        <p className="text-center text-2xl text-gray-300 mb-12">
          Vous devez vous connecter pour ajouter un bon plan.
        </p>
      )}

      <div className="flex justify-center space-x-4 mb-8">
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category.id_categorie} value={category.id_categorie}>
                {category.nomcategorie}
              </option>
            ))}
          </select>
          <FaFilter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="date">Trier par date</option>
            <option value="price">Trier par prix</option>
          </select>
          <FaSortAmountDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBonPlans.map((bonPlan) => (
          <BonPlanCard key={bonPlan.id_bonplan} bonPlan={bonPlan} user={user} />
        ))}
      </div>
    </div>
  )
}
