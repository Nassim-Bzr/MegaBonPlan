import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { 
  FaThumbsUp, 
  FaCommentDots, 
  FaShareAlt, 
  FaRegBookmark, 
  FaTrash, 
  FaEdit,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaPlus,
  FaMinus,
  FaClock,
  FaUser,
  FaThermometerHalf,
  FaFire
} from 'react-icons/fa';
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';
import './bonplandetails.css';

const BonPlanDetails = ({ user }) => {
  const { id } = useParams();
  const [bonPlan, setBonPlan] = useState(null);
  const { user: authUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authorName, setAuthorName] = useState('');
  const [comments, setComments] = useState([]);
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [editingComment, setEditingComment] = useState(null);
  const [likes, setLikes] = useState(0);
  const [userVote, setUserVote] = useState(0);

  useEffect(() => {
    const fetchBonPlanDetails = async () => {
      try {
        const bonPlanResponse = await axios.get(`http://localhost:8080/api/bonplans/${id}`);
        setBonPlan(bonPlanResponse.data);
        setLikes(bonPlanResponse.data.likes || 0);

        const authorResponse = await axios.get(`http://localhost:8080/api/utilisateur/${bonPlanResponse.data.id_utilisateur}`);
        setAuthorName(authorResponse.data.nom);

        const commentsResponse = await axios.get(`http://localhost:8080/api/commentary/bonplan/${id}`);
        const commentsWithUsernames = await Promise.all(commentsResponse.data.map(async comment => {
          const userResponse = await axios.get(`http://localhost:8080/api/utilisateur/${comment.id_utilisateur}`);
          return { ...comment, username: userResponse.data.nom };
        }));
        setComments(commentsWithUsernames);

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors du chargement du bon plan ou des commentaires:", error);
        setError("Impossible de charger le bon plan ou les commentaires.");
        setLoading(false);
      }
    };

    if (id) {
      fetchBonPlanDetails();
    } else {
      setError("ID du bon plan non fourni ou incorrect.");
      setLoading(false);
    }
  }, [id]);

  const handleCommentSubmit = async (data) => {
    if (!authUser) {
      console.error("Utilisateur non connecté");
      return;
    }

    const requestBody = {
      contenu: data.text,
      id_bonplan: id,
      id_utilisateur: authUser.id,
    };

    try {
      const response = await axios.post(`http://localhost:8080/api/commentary`, requestBody);
      const userResponse = await axios.get(`http://localhost:8080/api/utilisateur/${authUser.id}`);
      const newComment = { ...response.data, username: userResponse.data.nom };
      if (response.status === 201 || response.status === 200) {
        setComments(prev => [...prev, newComment]);
      } else {
        throw new Error(response.data.message || 'Erreur lors de la publication du commentaire');
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!authUser?.isadmin) return;
    
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api/commentary/${commentId}`,
          {
            headers: {
              Authorization: `Bearer ${authUser.token}`,
            },
          }
        );

        if (response.status === 200) {
          setComments(comments.filter(comment => comment.id_commentaire !== commentId));
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du commentaire:', error);
      }
    }
  };

  const handleEditComment = (comment) => {
    if (!authUser?.isadmin) return;
    setEditingComment(comment);
    setIsEditingComment(true);
  };

  const handleUpdateComment = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:8080/api/commentary/${editingComment.id_commentaire}`,
        {
          contenu: editingComment.contenu,
        },
        {
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        }
      );

      if (response.status === 200) {
        setComments(comments.map(comment =>
          comment.id_commentaire === editingComment.id_commentaire
            ? { ...comment, contenu: editingComment.contenu }
            : comment
        ));
        setIsEditingComment(false);
        setEditingComment(null);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du commentaire:', error);
    }
  };

  const handleVote = async (voteType) => {
    if (!authUser) {
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
          id_utilisateur: authUser.id,
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

  if (loading) {
    return (
      <div className="detail-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement du deal...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-container">
        <div className="error-container">
          <h2>Erreur</h2>
          <p>{error}</p>
          <Link to="/bonplans" className="back-btn">
            <FaArrowLeft /> Retour aux deals
          </Link>
        </div>
      </div>
    );
  }

  const temperature = bonPlan.temperature || 'COOL';
  const tempColor = getTemperatureColor(temperature);

  return (
    <div className="detail-container">
      {/* Navigation */}
      <div className="detail-nav">
        <Link to="/bonplans" className="back-link">
          <FaArrowLeft />
          Retour aux deals
        </Link>
        <div className="breadcrumb">
          <span>Deals</span> {' > '} <span>{bonPlan.titre}</span>
        </div>
      </div>

      {/* Deal principal */}
      <div className="deal-detail-card">
        {/* Header avec température */}
        <div className="deal-detail-header">
          <div className="temperature-large" style={{ backgroundColor: tempColor }}>
            <FaThermometerHalf className="temp-icon" />
            <span className="temp-score">{likes}°</span>
            {(temperature === 'BURNING' || temperature === 'HOT') && (
              <FaFire className="fire-icon" />
            )}
          </div>
          <div className="deal-meta-info">
            <div className="author-info">
              <FaUser className="user-icon" />
              <span>Partagé par <strong>{authorName}</strong></span>
            </div>
            <div className="time-info">
              <FaClock className="clock-icon" />
              <span>Il y a {timeSince(bonPlan.datepost)}</span>
            </div>
          </div>
        </div>

        <div className="deal-detail-content">
          {/* Système de vote */}
          <div className="vote-system-detail">
            <button 
              className={`vote-btn vote-up ${userVote === 1 ? 'active' : ''}`}
              onClick={() => handleVote(1)}
              disabled={!authUser}
            >
              <FaPlus />
            </button>
            <div className="vote-score-large">{likes}</div>
            <button 
              className={`vote-btn vote-down ${userVote === -1 ? 'active' : ''}`}
              onClick={() => handleVote(-1)}
              disabled={!authUser}
            >
              <FaMinus />
            </button>
          </div>

          {/* Image et informations */}
          <div className="deal-main-content">
            {bonPlan.imglink && (
              <div className="deal-image-large">
                <img
                  src={bonPlan.imglink}
                  alt={bonPlan.titre}
                />
                <div className="discount-badge-large">
                  -{calculateDiscount(bonPlan.prix_initial, bonPlan.prix_reduit)}%
                </div>
              </div>
            )}

            <div className="deal-info-large">
              <h1 className="deal-title-large">{bonPlan.titre}</h1>
              <p className="deal-description-large">{bonPlan.description}</p>
              
              <div className="deal-pricing-large">
                <div className="price-main">
                  <span className="current-price-large">{bonPlan.prix_reduit}€</span>
                  <span className="original-price-large">{bonPlan.prix_initial}€</span>
                </div>
                <div className="savings-large">
                  Vous économisez {(bonPlan.prix_initial - bonPlan.prix_reduit).toFixed(2)}€
                </div>
              </div>

              <div className="deal-actions-large">
                <a 
                  href={bonPlan.lienaffiliation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-get-deal"
                >
                  <FaExternalLinkAlt />
                  Profiter du deal
                </a>
                <button className="btn-bookmark">
                  <FaRegBookmark />
                  Sauvegarder
                </button>
                <button className="btn-share">
                  <FaShareAlt />
                  Partager
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section commentaires */}
      <div className="comments-section">
        <div className="comments-header">
          <h3>
            <FaCommentDots />
            Commentaires ({comments.length})
          </h3>
        </div>

        {/* Édition de commentaire modal */}
        {isEditingComment && (
          <div className="edit-modal">
            <div className="edit-modal-content">
              <h2 className="edit-modal-title">Modifier le commentaire</h2>
              <form onSubmit={handleUpdateComment} className="edit-form">
                <textarea
                  value={editingComment.contenu}
                  onChange={(e) => setEditingComment({...editingComment, contenu: e.target.value})}
                  className="form-textarea"
                  rows="4"
                />
                <div className="form-actions">
                  <button
                    type="button"
                    onClick={() => setIsEditingComment(false)}
                    className="btn-cancel"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="btn-save"
                  >
                    Mettre à jour
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Composant de commentaires */}
        <div className="comments-container">
          <CommentSection
            currentUser={{
              currentUserId: authUser?.id.toString() || '',
              currentUserImg: '',
              currentUserProfile: '',
              currentUserFullName: authUser?.nom || 'Anonyme',
            }}
            logIn={{
              loginLink: '/signin',
              signupLink: '/signup'
            }}
            commentData={comments.map(comment => ({
              userId: comment.id_utilisateur.toString(),
              comId: comment.id_commentaire.toString(),
              fullName: comment.username,
              text: comment.contenu,
              avatarUrl: '',
              replies: []
            }))}
            onSubmitAction={handleCommentSubmit}
            currentData={(data) => {
              console.log('current data', data);
            }}
            customImg=""
            inputStyle={{ border: '2px solid #e9ecef', borderRadius: '8px' }}
            formStyle={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '12px' }}
            submitBtnStyle={{
              backgroundColor: '#4a90e2',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px'
            }}
            cancelBtnStyle={{
              backgroundColor: '#e9ecef',
              color: '#6c757d',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 20px'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BonPlanDetails;