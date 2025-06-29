import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaComment, FaPlus, FaMinus, FaExternalLinkAlt, FaBookmark, FaClock, FaFire, FaThermometerHalf } from 'react-icons/fa';
import TemperatureBadge from '../TemperatureBadge';
import './bonplancard.css'

const BonPlanCard = ({ bonPlan, user }) => {
  const [likes, setLikes] = useState(bonPlan.likes || 0);
  const [userVote, setUserVote] = useState(0); // -1, 0, +1
  const [authorName, setAuthorName] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (user && bonPlan.likes) {
      fetch(`http://localhost:8080/api/bonplans/liked/${bonPlan.id_bonplan}/${user.id}`)
        .then(response => response.json())
        .then(data => {
          if (data.liked) {
            setUserVote(1);
          }
        })
        .catch(error => console.error('Erreur lors de la vérification du like:', error));
    }
  }, [user, bonPlan]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/utilisateur/${bonPlan.id_utilisateur}`)
      .then(response => response.json())
      .then(data => {
        setAuthorName(data.nom);
      })
      .catch(error => console.error('Erreur lors de la récupération de l\'auteur:', error));
  }, [bonPlan.id_utilisateur]);

  useEffect(() => {
    if (user) {
      fetch(`http://localhost:8080/api/favoris/check/${bonPlan.id_bonplan}/${user.id}`)
        .then(response => response.json())
        .then(data => {
          setIsFavorite(data.isFavorite);
        })
        .catch(error => console.error('Erreur lors de la vérification des favoris:', error));
    }
  }, [user, bonPlan]);

  const calculateDiscount = (initialPrice, reducedPrice) => {
    return ((initialPrice - reducedPrice) / initialPrice * 100).toFixed(0);
  };

  const timeSince = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const seconds = Math.floor((now - postDate) / 1000);
    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) return `${interval} ans`;
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) return `${interval} mois`;
    interval = Math.floor(seconds / 86400);
    if (interval > 1) return `${interval} jours`;
    interval = Math.floor(seconds / 3600);
    if (interval > 1) return `${interval} heures`;
    interval = Math.floor(seconds / 60);
    if (interval > 1) return `${interval} minutes`;
    return `${Math.floor(seconds)} secondes`;
  };

  const handleVote = async (voteType) => {
    if (!user) {
      alert('Vous devez être connecté pour voter.');
      return;
    }

    const newVote = userVote === voteType ? 0 : voteType;
    const voteDiff = newVote - userVote;
    
    try {
      const response = await fetch('http://localhost:8080/api/bonplans/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          id_bonplan: bonPlan.id_bonplan, 
          id_utilisateur: user.id,
          voteType: newVote
        }),
      });

      if (response.ok) {
        setUserVote(newVote);
        setLikes(likes + voteDiff);
      }
    } catch (error) {
      console.error('Erreur lors du vote:', error);
    }
  };

  const handleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert('Vous devez être connecté pour ajouter aux favoris.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/favoris', {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id_bonplan: bonPlan.id_bonplan, id_utilisateur: user.id }),
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
      }
    } catch (error) {
      console.error('Erreur lors de la modification des favoris:', error);
    }
  };

  const getTemperatureColor = (temp) => {
    switch(temp) {
      case 'BURNING': return '#ff4444';
      case 'HOT': return '#ff6600';
      case 'WARM': return '#ff8800';
      case 'COOL': return '#4a90e2';
      case 'COLD': return '#74b9ff';
      default: return '#ddd';
    }
  };

  const temperature = bonPlan.temperature || 'COOL';
  const tempColor = getTemperatureColor(temperature);

  return (
    <div 
      className="dealabs-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header avec badges et favoris */}
      <div className="deal-header">
        <div className="deal-badges">
          <span className="category-badge">{bonPlan.categorie}</span>
          <div className="temperature-indicator" style={{ backgroundColor: tempColor }}>
            <FaThermometerHalf className="temp-icon" />
            <span className="temp-score">{likes}°</span>
          </div>
        </div>
        <button 
          onClick={handleFavorite}
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
        >
          <FaBookmark />
        </button>
      </div>

      {/* Contenu principal */}
      <div className="deal-content">
        {/* Système de vote */}
        <div className="vote-system">
          <button 
            className={`vote-btn vote-up ${userVote === 1 ? 'active' : ''}`}
            onClick={() => handleVote(1)}
            disabled={!user}
          >
            <FaPlus />
          </button>
          <div className="vote-score">{likes}</div>
          <button 
            className={`vote-btn vote-down ${userVote === -1 ? 'active' : ''}`}
            onClick={() => handleVote(-1)}
            disabled={!user}
          >
            <FaMinus />
          </button>
        </div>

        {/* Image du produit */}
        <div className="deal-image-container">
          <img 
            src={bonPlan.imglink} 
            alt={bonPlan.titre}
            className="deal-image"
          />
          <div className="discount-badge">
            -{calculateDiscount(bonPlan.prix_initial, bonPlan.prix_reduit)}%
          </div>
        </div>

        {/* Informations du deal */}
        <div className="deal-info">
          <h3 className="deal-title">{bonPlan.titre}</h3>
          <p className="deal-description">{bonPlan.description}</p>
          
          <div className="deal-pricing">
            <div className="price-container">
              <span className="current-price">{bonPlan.prix_reduit}€</span>
              <span className="original-price">{bonPlan.prix_initial}€</span>
            </div>
            <div className="savings">
              Économies : {(bonPlan.prix_initial - bonPlan.prix_reduit).toFixed(2)}€
            </div>
          </div>

          <div className="deal-meta">
            <div className="deal-author">
              <span className="author-name">Par {authorName}</span>
              <span className="deal-time">
                <FaClock className="time-icon" />
                Il y a {timeSince(bonPlan.datepost)}
              </span>
            </div>
          </div>

          <div className="deal-actions">
            <Link 
              to={`/bonplans/details/${bonPlan.id_bonplan}`}
              className="btn-secondary"
            >
              <FaComment className="btn-icon" />
              Voir les détails
            </Link>
            <a 
              href={bonPlan.lienaffiliation}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <FaExternalLinkAlt className="btn-icon" />
              Voir le deal
            </a>
          </div>
        </div>
      </div>

      {/* Overlay pour les deals très chauds */}
      {(temperature === 'BURNING' || temperature === 'HOT') && (
        <div className="hot-deal-overlay">
          <FaFire className="fire-icon" />
          <span>DEAL CHAUD !</span>
        </div>
      )}
    </div>
  );
};

export default BonPlanCard;
