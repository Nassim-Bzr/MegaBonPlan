import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './Category.css'
import { FaFire, FaSearch, FaArrowRight, FaTag } from 'react-icons/fa'

export default function Category() {
  const [categories, setCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:8080/api/categories')
      .then((response) => response.json())
      .then((data) => {
        setCategories(data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des catégories:', error)
        setLoading(false)
      })
  }, [])

  const filteredCategories = categories.filter(category =>
    category.nomcategorie.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="category-page-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Chargement des catégories...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="category-page-container">
      {/* Header moderne */}
      <div className="category-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="main-title">
              <FaTag className="title-icon" />
              Catégories
              <span className="subtitle">Explorez nos univers</span>
            </h1>
          </div>
          
          {/* Barre de recherche */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Rechercher une catégorie..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{filteredCategories.length}</span>
          <span className="stat-label">Catégories</span>
        </div>
        <div className="stat-item">
          <FaFire className="stat-icon" />
          <span className="stat-label">Deals actifs</span>
        </div>
      </div>

      {/* Grille des catégories */}
      <div className="categories-grid">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <div key={category.id_categorie} className="category-card">
              <div className="card-image-container">
                <img
                  src={category.imglink}
                  alt={category.nomcategorie}
                  className="card-image"
                  onError={(e) => {
                    e.target.src = '/api/placeholder/300/200'
                  }}
                />
                <div className="card-overlay"></div>
              </div>
              
              <div className="card-content">
                <h3 className="card-title">{category.nomcategorie}</h3>
                <p className="card-description">
                  Découvrez tous les deals de cette catégorie
                </p>
                
                <Link
                  to={`/category/${category.id_categorie}`}
                  className="explore-button"
                >
                  <span>Explorer</span>
                  <FaArrowRight className="arrow-icon" />
                </Link>
              </div>
              
              <div className="card-glow"></div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3>Aucune catégorie trouvée</h3>
            <p>Modifiez votre recherche pour voir plus de catégories.</p>
          </div>
        )}
      </div>
    </div>
  )
}
