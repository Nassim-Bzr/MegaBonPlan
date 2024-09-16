import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../AuthContext';
import { FaThumbsUp, FaCommentDots, FaShareAlt, FaRegBookmark } from 'react-icons/fa';
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
    if (!user) {
      console.error("Utilisateur non connecté");
      return;
    }

    const requestBody = {
      contenu: data.text,
      id_bonplan: id,
      id_utilisateur: user.id,
    };

    try {
      const response = await axios.post(`https://megabonplan-f8522b195111.herokuapp.com/api/commentary`, requestBody);
      const userResponse = await axios.get(`https://megabonplan-f8522b195111.herokuapp.com/api/utilisateur/${user.id}`);
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
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold">Commentaires</h2>
        <CommentSection
          currentUser={{
            currentUserId: user ? user.id : null,
            currentUserImg: user ? user.imageUrl || 'https://ui-avatars.com/api/?name=' + user.nom : null,
            currentUserProfile: user ? user.profileUrl || '#' : null,
            currentUserFullName: user ? user.nom : 'Anonyme',
          }}
          logIn={{
            loginLink: '/connexion',
            signupLink: '/inscription'
          }}
          commentData={comments.map(comment => ({
            userId: comment.id_utilisateur,
            comId: comment.id_commentaire,
            fullName: comment.username,
            userProfile: '#',
            text: comment.contenu,
            avatarUrl: 'https://ui-avatars.com/api/?name=' + comment.username,
            replies: []
          }))}
          onSubmitAction={handleCommentSubmit}
        />
      </div>
    </div>
  );
};

export default BonPlanDetails;