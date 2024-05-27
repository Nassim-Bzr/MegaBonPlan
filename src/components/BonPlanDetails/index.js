import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { FaThumbsUp, FaCommentDots, FaShareAlt, FaRegBookmark, FaPen } from 'react-icons/fa';

const BonPlanDetails = () => {
  const { id } = useParams();
  const [bonPlan, setBonPlan] = useState(null);
  const [comment, setComment] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:8080/api/bonplans/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Afficher les données récupérées pour débogage
        setBonPlan(data);
      })
      .catch((error) =>
        console.error('Erreur lors de la récupération du bon plan:', error)
      );
  }, [id]);

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      fetch(`http://localhost:8080/api/commentary/${commentId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setBonPlan((prevState) => ({
              ...prevState,
              commentaires: prevState.commentaires.filter(
                (comment) => comment.id_commentaire !== commentId
              ),
            }));
            alert('Commentaire supprimé avec succès');
          } else {
            alert('Erreur lors de la suppression du commentaire');
          }
        })
        .catch((error) =>
          console.error('Erreur lors de la suppression:', error)
        );
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
        const response = await fetch(`http://localhost:8080/api/commentary`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (response.ok) {
          setBonPlan((prev) => ({
            ...prev,
            commentaires: [...prev.commentaires, data],
          }));
          setComment(''); // Réinitialiser le commentaire
        } else {
          throw new Error(data.message || 'Error posting comment');
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire:", error);
      }
    }
  };

  console.log(bonPlan)
  if (!bonPlan) return <div className="text-center">Chargement...</div>;

  return (
    <div className="animatedBackground mx-auto p-4">
      <div className="max-w-4xl mr-auto ml-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={bonPlan.imglink}
          alt={bonPlan.titre}
          className="w-full h-64 m-2 rounded-2xl object-cover "
        />
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-2">{bonPlan.titre}</h1>
          <p className="text-gray-700 mb-4">{bonPlan.description}</p>
          <a
            href={bonPlan.lienaffiliation}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Visitez le lien
          </a>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold">Commentaires</h2>

          {bonPlan.commentaires &&
            bonPlan.commentaires.map((comment) => (
              <div
                key={comment.id_commentaire}
                className="bg-gray-100 p-2 rounded-lg mt-2"
              >
                <p>{comment.contenu}</p>
                <div className="text-sm text-gray-600">:
                  Posté le: {new Date(comment.datecommentaire).toLocaleDateString()}
                </div>
                {user?.isadmin && (
                  <button
                    onClick={() => handleDeleteComment(comment.id_commentaire)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            ))}

{bonPlan.commentaires.length > 0 ? (
            bonPlan.commentaires.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-lg shadow mt-4">
                <p className="text-gray-800">{comment.content}</p>
                <p className="text-gray-500 text-sm mt-1">Posté par <strong>{comment.author}</strong></p>
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
