import React, { useState, useEffect } from "react";
import { useAuth } from '../../AuthContext'; // Assurez-vous que le chemin est correct
import { FaTrash, FaEdit, FaPlus, FaSearch, FaCopy, FaGift, FaFilter, FaCalendarAlt, FaPercent } from 'react-icons/fa';
import './CodesPromos.css';

export default function CodesPromos() {
  const [codesPromos, setCodesPromos] = useState([]);
  const [filteredCodes, setFilteredCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);
  const [newCodePromo, setNewCodePromo] = useState({
    code: '',
    description: '',
    dateexpiration: '',
    approuvéparadmin: false,
    marchand: '',
    imgmarchand: '',
    reduction: '',
    montant: ''
  });
  const [selectedPromos, setSelectedPromos] = useState(new Set());
  const [isEditing, setIsEditing] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:8080/api/codepromos")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setCodesPromos(data);
          setFilteredCodes(data);
        } else {
          console.error("La réponse de l'API n'est pas un tableau:", data);
          setCodesPromos([]);
          setFilteredCodes([]);
          setError("Format de données invalide");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des codes promos:", error);
        setError("Erreur lors du chargement des codes promos");
        setCodesPromos([]);
        setFilteredCodes([]);
        setLoading(false);
      });
  }, []);

  // Filter and search effect
  useEffect(() => {
    let result = [...codesPromos];
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(code =>
        code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.marchand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filterBy === 'active') {
      result = result.filter(code => new Date(code.dateexpiration) > new Date());
    } else if (filterBy === 'expired') {
      result = result.filter(code => new Date(code.dateexpiration) <= new Date());
    } else if (filterBy === 'approved') {
      result = result.filter(code => code.approuvéparadmin);
    }
    
    setFilteredCodes(result);
  }, [searchTerm, filterBy, codesPromos]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCodePromo((prev) => ({ ...prev, [name]: value }));
  };

  const submitNewCodePromo = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/codepromos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCodePromo),
      });

      const responseData = await response.json();
      if (response.ok) {
        setCodesPromos([...codesPromos, responseData]);
        setIsAddModalOpen(false);
        setNewCodePromo({
          code: '',
          description: '',
          dateexpiration: '',
          approuvéparadmin: false,
          marchand: '',
          imgmarchand: '',
          reduction: '',
          montant: ''
        });
      } else {
        console.error('Failed to upload the code promo:', responseData.message);
        throw new Error(responseData.message || 'Failed to upload the code promo.');
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du code promo:", error);
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenViewModal = (code) => {
    setSelectedCode(code);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedCode(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // Simple notification
    const btn = event.target.closest('.copy-button');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa fa-check"></i> Copié !';
    btn.style.background = '#28a745';
    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.style.background = '';
    }, 2000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce code promo ?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/codepromos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (response.ok) {
          setCodesPromos(codesPromos.filter(promo => promo.id_codepromo !== id));
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleEdit = (promo) => {
    setEditingPromo(promo);
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/api/codepromos/${editingPromo.id_codepromo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(editingPromo)
      });

      if (response.ok) {
        setCodesPromos(codesPromos.map(promo => 
          promo.id_codepromo === editingPromo.id_codepromo ? editingPromo : promo
        ));
        setIsEditing(false);
        setEditingPromo(null);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleMultipleDelete = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedPromos.size} codes promo ?`)) {
      try {
        const deletePromises = Array.from(selectedPromos).map(id =>
          fetch(`http://localhost:8080/api/codepromos/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
        );

        await Promise.all(deletePromises);
        
        setCodesPromos(codesPromos.filter(promo => !selectedPromos.has(promo.id_codepromo)));
        setSelectedPromos(new Set());
      } catch (error) {
        console.error('Erreur lors de la suppression multiple:', error);
      }
    }
  };

  const isExpired = (date) => {
    return new Date(date) <= new Date();
  };

  // Affichage de chargement
  if (loading) {
    return (
      <div className="promo-page-container">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Chargement des codes promos...</p>
        </div>
      </div>
    );
  }

  // Affichage d'erreur
  if (error) {
    return (
      <div className="promo-page-container">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Erreur de chargement</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="promo-page-container">
      {/* Header moderne */}
      <div className="promo-header">
        <div className="header-content">
          <div className="title-section">
            <h1 className="main-title">
              <FaGift className="title-icon" />
              Codes Promos
              <span className="subtitle">Économisez encore plus !</span>
            </h1>
          </div>
          
          {user && (
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="btn-add-promo"
            >
              <FaPlus />
              Ajouter un code
            </button>
          )}
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="search-filters-bar">
        <div className="search-container">
          <div className="search-input-wrapper">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Rechercher un code, marchand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        
        <div className="filters-container">
          <select
            className="filter-select"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="all">Tous les codes</option>
            <option value="active">Codes actifs</option>
            <option value="expired">Codes expirés</option>
            <option value="approved">Codes approuvés</option>
          </select>
        </div>
      </div>

      {/* Statistiques */}
      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{filteredCodes.length}</span>
          <span className="stat-label">Codes disponibles</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {filteredCodes.filter(code => !isExpired(code.dateexpiration)).length}
          </span>
          <span className="stat-label">Codes actifs</span>
        </div>
        <div className="stat-item">
          <FaPercent className="stat-icon" />
          <span className="stat-label">Réductions</span>
        </div>
      </div>

      {/* Grille des codes promos */}
      <div className="promo-grid">
        {filteredCodes.length > 0 ? (
          filteredCodes.map((promo) => (
            <div 
              key={promo.id_codepromo} 
              className={`promo-card ${isExpired(promo.dateexpiration) ? 'expired' : ''}`}
            >
              {/* Badge statut */}
              <div className="card-badges">
                {!isExpired(promo.dateexpiration) && (
                  <span className="badge active">Actif</span>
                )}
                {isExpired(promo.dateexpiration) && (
                  <span className="badge expired">Expiré</span>
                )}
                {promo.approuvéparadmin && (
                  <span className="badge approved">Vérifié</span>
                )}
              </div>

              {/* Image marchand */}
              {promo.imgmarchand && (
                <div className="merchant-image-container">
                  <img 
                    src={promo.imgmarchand} 
                    alt={promo.marchand}
                    className="merchant-image"
                  />
                </div>
              )}

              {/* Contenu principal */}
              <div className="card-content">
                <div className="merchant-name">{promo.marchand}</div>
                <div className="promo-description">{promo.description}</div>
                
                {/* Réduction */}
                {promo.reduction && (
                  <div className="reduction-badge">
                    -{promo.reduction}
                  </div>
                )}
                
                {/* Code */}
                <div className="code-container">
                  <span className="code-label">Code :</span>
                  <div className="code-display">
                    <span className="code-text">{promo.code}</span>
                    <button 
                      onClick={() => copyToClipboard(promo.code)}
                      className="copy-button"
                      title="Copier le code"
                    >
                      <FaCopy />
                    </button>
                  </div>
                </div>

                {/* Date d'expiration */}
                <div className="expiry-info">
                  <FaCalendarAlt className="calendar-icon" />
                  <span>Expire le {new Date(promo.dateexpiration).toLocaleDateString('fr-FR')}</span>
                </div>
              </div>

              {/* Actions admin */}
              {user?.isadmin && (
                <div className="card-actions">
                  <button 
                    onClick={() => handleEdit(promo)}
                    className="btn-edit"
                    title="Modifier"
                  >
                    <FaEdit />
                  </button>
                  <button 
                    onClick={() => handleDelete(promo.id_codepromo)}
                    className="btn-delete"
                    title="Supprimer"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}

              <div className="card-glow"></div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <div className="empty-icon">🎯</div>
            <h3>Aucun code promo trouvé</h3>
            <p>
              {searchTerm || filterBy !== 'all' 
                ? 'Modifiez votre recherche ou vos filtres.'
                : 'Soyez le premier à partager un code promo !'}
            </p>
          </div>
        )}
      </div>

      {/* Modal d'ajout (simplifié pour l'exemple) */}
      {isAddModalOpen && (
        <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Ajouter un code promo</h2>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="btn-close"
              >
                ×
              </button>
            </div>
            <form onSubmit={submitNewCodePromo} className="modal-form">
              <div className="form-row">
                <label>Code promo</label>
                <input
                  type="text"
                  name="code"
                  value={newCodePromo.code}
                  onChange={handleInputChange}
                  className="form-input-compact"
                  required
                />
              </div>
              <div className="form-row">
                <label>Marchand</label>
                <input
                  type="text"
                  name="marchand"
                  value={newCodePromo.marchand}
                  onChange={handleInputChange}
                  className="form-input-compact"
                  required
                />
              </div>
              <div className="form-row">
                <label>Description</label>
                <textarea
                  name="description"
                  value={newCodePromo.description}
                  onChange={handleInputChange}
                  className="form-textarea-compact"
                  rows="3"
                  required
                />
              </div>
              <div className="form-row-group">
                <div className="form-row">
                  <label>Réduction</label>
                  <input
                    type="text"
                    name="reduction"
                    value={newCodePromo.reduction}
                    onChange={handleInputChange}
                    className="form-input-compact"
                    placeholder="ex: 20%"
                  />
                </div>
                <div className="form-row">
                  <label>Date d'expiration</label>
                  <input
                    type="date"
                    name="dateexpiration"
                    value={newCodePromo.dateexpiration}
                    onChange={handleInputChange}
                    className="form-input-compact"
                    required
                  />
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setIsAddModalOpen(false)} className="btn-cancel-compact">
                  Annuler
                </button>
                <button type="submit" className="btn-save-compact">
                  Ajouter
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
