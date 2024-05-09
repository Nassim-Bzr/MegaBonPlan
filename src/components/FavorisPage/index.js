import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function FavoritesPage() {
  const [favoris, setFavoris] = useState([])
  console.log(favoris)
  useEffect(() => {
    fetch('http://localhost:8080/api/favoris')
      .then((response) => response.json())
      .then(setFavoris)
      .catch(console.error)
  }, [])

  return (
    <div className="min-h-screen animatedBackground bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-white text-center text-gray-800 mb-6">
        Mes bon plans favoris
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {favoris.length > 0 ? (
          favoris.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-4">
              <img
                src={item.imglink}
                alt={item.Titre}
                className="w-full h-40 object-cover mb-4"
              />
              <h2 className="text-xl font-semibold text-blue-800">
                {item.Titre}
              </h2>
              <p className="text-gray-600">{item.Description}</p>
              <Link
                to={item.LienAffiliation}
                className="text-indigo-500 hover:text-indigo-600 transition-colors mt-2 inline-block"
              >
                Voir plus
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center flex justify-center text-white mr-auto text-2xl mt-3">Aucun favori enregistré.</p>
        )}
      </div>
    </div>
  )
}
