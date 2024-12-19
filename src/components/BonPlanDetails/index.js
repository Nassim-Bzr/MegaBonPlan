import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { FaThumbsUp, FaCommentDots, FaShareAlt, FaRegBookmark, FaTrash, FaEdit } from 'react-icons/fa';
import { CommentSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css';

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

  useEffect(() => {
    const fetchBonPlanDetails = async () => {
      try {
        const bonPlanResponse = await axios.get(`https://megabonplan-f8522b195111.herokuapp.com/api/bonplans/${id}`);
        setBonPlan(bonPlanResponse.data);

        const authorResponse = await axios.get(`https://megabonplan-f8522b195111.herokuapp.com/api/utilisateur/${bonPlanResponse.data.id_utilisateur}`);
        setAuthorName(authorResponse.data.nom);

        const commentsResponse = await axios.get(`https://megabonplan-f8522b195111.herokuapp.com/api/commentary/bonplan/${id}`);
        const commentsWithUsernames = await Promise.all(commentsResponse.data.map(async comment => {
          const userResponse = await axios.get(`https://megabonplan-f8522b195111.herokuapp.com/api/utilisateur/${comment.id_utilisateur}`);
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
      const response = await axios.post(`https://megabonplan-f8522b195111.herokuapp.com/api/commentary`, requestBody);
      const userResponse = await axios.get(`https://megabonplan-f8522b195111.herokuapp.com/api/utilisateur/${authUser.id}`);
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
          `https://megabonplan-f8522b195111.herokuapp.com/api/commentary/${commentId}`,
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
        `https://megabonplan-f8522b195111.herokuapp.com/api/commentary/${editingComment.id_commentaire}`,
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

  if (loading) return <div className="text-center">Chargement...</div>;
  if (error) return <div className="text-center">Erreur : {error}</div>;

  return (
    <div className="container animatedBackground p-20 min-w-fit">
      <div className="bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex">
          {bonPlan.imglink && (
            <img
              src={bonPlan.imglink}
              alt={bonPlan.titre}
              className="w-24 h-24 object-cover rounded-lg mr-4"
            />
          )}
          <div className="flex-1">
            <h2 className="text-xl font-bold">{bonPlan.titre}</h2>
            <p className="text-red-500 text-lg">{bonPlan.prix_reduit}€ </p>
            <p className="text-gray-700">{bonPlan.description}</p>
            <p className="text-blue-500">{bonPlan.store}</p>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="text-gray-500">
            <span>{bonPlan.time}</span> • <span>{authorName}</span>
          </div>
          <div className="flex space-x-2">
            <button className="text-gray-500 hover:text-gray-700"><FaRegBookmark /></button>
            <button className="text-gray-500 hover:text-gray-700"><FaCommentDots /> {comments.length}</button>
            <a href={bonPlan.lienaffiliation} target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Voir le deal
            </a>
          </div>
        </div>
      </div>
      {isEditingComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Modifier le commentaire</h2>
            <form onSubmit={handleUpdateComment} className="space-y-4">
              <textarea
                value={editingComment.contenu}
                onChange={(e) => setEditingComment({...editingComment, contenu: e.target.value})}
                className="w-full p-2 border rounded"
                rows="4"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingComment(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold">Commentaires</h2>
        {comments.map(comment => (
          <div key={comment.id_commentaire} className="border-b p-4 relative">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold">{comment.username || 'Anonyme'}</p>
                <p className="text-gray-700">{comment.contenu}</p>
              </div>
              {authUser?.isadmin && (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditComment(comment)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteComment(comment.id_commentaire)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        <CommentSection
          currentUser={{
            currentUserId: authUser ? authUser.id : null,
            currentUserImg: authUser ? `https://ui-avatars.com/api/?name=${authUser.nom}` : null,
            currentUserProfile: authUser ? '#' : null,
            currentUserFullName: authUser ? authUser.nom : 'Anonyme',
          }}
          logIn={{
            loginLink: '/connexion',
            signupLink: '/inscription'
          }}
          commentData={[]}
          onSubmitAction={handleCommentSubmit}
        />
      </div>
    </div>
  );
};

export default BonPlanDetails;