import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { FaThumbsUp, FaCommentDots, FaShareAlt, FaRegBookmark, FaPen, FaTimes } from 'react-icons/fa';

const BonPlanDetails = () => {
  const { id } = useParams();
  const [bonPlan, setBonPlan] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [authorName, setAuthorName] = useState('');

  useEffect(() => {
    const fetchBonPlanDetails = async () => {
      try {
        const bonPlanResponse = await axios.get(`https://megabonplan-f8522b195111.herokuapp.com/api/bonplans/${id}`);
        console.log('Bon Plan Response:', bonPlanResponse.data);
        setBonPlan(bonPlanResponse.data);
  
        const commentsResponse = await axios.get(`https://megabonplan-f8522b195111.herokuapp.com/api/commentary/bonplan/${id}`);
        console.log('Comments Response:', commentsResponse.data);
  
        const commentsWithUsernames = await Promise.all(commentsResponse.data.map(async comment => {
          const userResponse = await axios.get(`https://megabonplan-f8522b195111.herokuapp.com/api/utilisateur/${comment.id_utilisateur}`);
          console.log('User Response for Comment:', userResponse.data);
          return { ...comment, username: userResponse.data.nom };
        }));
        setComments(commentsWithUsernames);
  
        const authorResponse = await axios.get(`https://megabonplan-f8522b195111.herokuapp.com/api/utilisateur/${bonPlanResponse.data.id_utilisateur}`);
        console.log('Author Response:', authorResponse.data);
        setAuthorName(authorResponse.data.nom);
  
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
  

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      axios.delete(`https://megabonplan-f8522b195111.herokuapp.com/api/commentary/${commentId}`)
        .then(response => {
          if (response.status === 200) {
            setComments(prevComments => prevComments.filter(comment => comment.id_commentaire !== commentId));
            alert('Commentaire supprimé avec succès');
          } else {
            alert('Erreur lors de la suppression du commentaire');
          }
        })
        .catch(error => console.error('Erreur lors de la suppression:', error));
    }
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const submitComment = async (event) => {
    event.preventDefault();
    if (comment.trim() && user) {
      const requestBody = {
        contenu: comment,
        id_bonplan: id,
        id_utilisateur: user.id,
      };

      try {
        const response = await axios.post(`https://megabonplan-f8522b195111.herokuapp.com/api/commentary`, requestBody);
        const userResponse = await axios.get(`https://megabonplan-f8522b195111.herokuapp.com/api/utilisateur/${user.id}`);
        const newComment = { ...response.data, username: userResponse.data.nom };
        if (response.status === 201 || response.status === 200) {
          setComments(prev => [...prev, newComment]);
          setComment(''); // Réinitialiser le commentaire
        } else {
          throw new Error(response.data.message || 'Erreur lors de la publication du commentaire');
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire:", error);
      }
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const response = await axios.post(`https://megabonplan-f8522b195111.herokuapp.com/api/commentary/like/${commentId}`);
      if (response.status === 200) {
        setComments(prevComments => prevComments.map(comment => {
          if (comment.id_commentaire === commentId) {
            return { ...comment, likes: comment.likes + 1 };
          }
          return comment;
        }));
      }
    } catch (error) {
      console.error("Erreur lors du like du commentaire:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      submitComment(event);
    }
  };

  if (loading) return <div className="text-center">Chargement...</div>;
  if (error) return <div className="text-center">Erreur : {error}</div>;

  return (
    <div className="animatedBackground mx-auto p-4">
      <div className="max-w-4xl mr-auto ml-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        {bonPlan.imglink && (
          <img
            src={bonPlan.imglink}
            alt={bonPlan.titre}
            className="w-full h-64 m-2 rounded-2xl object-cover"
          />
        )}
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-2">{bonPlan.titre}</h1>
          <p>Postée par {authorName}</p>
          <p className="text-gray-700 mb-4">{bonPlan.description}</p>
          {bonPlan.lienaffiliation && (
            <a
              href={bonPlan.lienaffiliation}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Visitez le lien
            </a>
          )}
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold">Commentaires</h2>
          {comments.length > 0 ? (
            comments.map((comment) => (
              <div key={comment.id_commentaire} className="bg-gray-100 p-2 rounded-lg mt-2">
                <p>{comment.contenu}</p>
                <div className="text-sm text-gray-600">
                  Posté le: {new Date(comment.datecommentaire).toLocaleDateString()} par <strong>{comment.username || 'Utilisateur inconnu'}</strong>
                </div>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleLikeComment(comment.id_commentaire)}
                    className="text-blue-500 hover:text-blue-700 mr-2"
                  >
                    <FaThumbsUp /> {comment.likes}
                  </button>
                  {user?.isadmin && (
                    <button
                      onClick={() => handleDeleteComment(comment.id_commentaire)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="flex justify-center items-center mb-4">
                <FaCommentDots className="text-5xl text-blue-500" />
              </div>
              <p className="text-gray-600 text-lg">Une question, un avis ou une suggestion ?</p>
              <button
                onClick={() => document.getElementById('comment-form').scrollIntoView()}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
              >
                <FaPen className="mx-auto w-12" /> Postez le premier commentaire
              </button>
            </div>
          )}
          {user && (
            <form onSubmit={submitComment} className="mt-4">
              <textarea
                className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Ajoutez un commentaire..."
                value={comment}
                onChange={handleCommentChange}
                onKeyDown={handleKeyPress}
              ></textarea>
              <button
                type="submit"
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Poster
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default BonPlanDetails;
