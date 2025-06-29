import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaThumbsUp, FaCommentDots, FaShareAlt, FaRegBookmark, FaPen, FaTimes } from 'react-icons/fa';

function DetailsDiscussion() {
  const { id } = useParams();  // Récupération de l'ID depuis l'URL
  const [discussion, setDiscussion] = useState(null);
  const [user, setUser] = useState(null);  // État pour stocker les détails de l'utilisateur
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);  // État pour le chargement
  const [error, setError] = useState(null);      // État pour les erreurs

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:8080/api/discussions/${id}`)
        .then(response => {
          setDiscussion(response.data);
          return axios.get(`http://localhost:8080/api/utilisateur/${response.data.id_utilisateur}`);
        })
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(error => {
          console.error("Erreur lors du chargement des détails de la discussion ou de l'utilisateur:", error);
          setError("Impossible de charger les détails de la discussion ou de l'utilisateur.");
          setLoading(false);
        });
    } else {
      setError("ID de discussion non fourni ou incorrect.");
      setLoading(false);
    }
  }, [id]);

  const handleLike = () => {
    setDiscussion(prev => ({
      ...prev,
      likes: prev.likes + 1
    }));
  };

  const handleShare = () => {
    setShareModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setShareModalOpen(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Lien copié dans le presse-papier');
  };

  if (loading) return <div>Chargement...</div>;
  if (error) return <div>Erreur : {error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <p className="text-gray-500 text-sm">{discussion?.timeAgo}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{discussion?.titre}</h1>
          <p className="text-gray-600 text-sm">Partagé par <strong>{user?.nom}</strong></p>
          <p className="text-gray-700 mt-4">{discussion?.content}</p>
          <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
            <button onClick={handleLike} className="flex items-center text-blue-500 hover:text-blue-700 transition font-semibold">
              <FaThumbsUp className="mr-1" /> Like ({discussion?.likes})
            </button>
            <button onClick={handleShare} className="flex items-center text-gray-500 hover:text-gray-700 transition">
              <FaShareAlt className="mr-1" /> Partager
            </button>
          </div>
        </div>
      </div>

      {shareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full relative">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-700" onClick={handleCloseShareModal}>
              <FaTimes />
            </button>
            <h2 className="text-2xl font-semibold mb-4">Partager</h2>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={window.location.href}
                readOnly
                className="w-full p-2 border rounded-lg"
              />
              <button
                onClick={handleCopyLink}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
              >
                Copier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailsDiscussion;
