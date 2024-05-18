import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FaThumbsUp, FaCommentDots, FaShareAlt, FaRegBookmark, FaPen } from 'react-icons/fa';

const mockDiscussion = {
  id: 1,
  category: 'High-tech & informatique',
  title: 'Ventrad adapté pour ryzen 7 7800x3d',
  author: 'Spritka',
  content: 'Bonjour, je cherche à savoir ce qui est le plus adapté. Je fais un "upgrade" de mon pc dans la globalité, je suis passé sur la cm X670E gaming plus de chez msi Le proc ryzen 7 7800x3d et je cherche un ventirad intéressant pour le mettre dessus justement, J\'ai comme tour la Diamond de chez Empire gaming pour situer au niveau de la taille dispo. Auriez-vous des recommandations ? Merci !',
  comments: [],
  likes: 5,
  timeAgo: 'il y a 32 minutes'
};

function DetailsDiscussion() {
  const { id } = useParams();
  const [discussion, setDiscussion] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch discussion details from an API or use mock data
    // Replace the following line with your API call
    setDiscussion(mockDiscussion);
  }, [id]);

  const handleLike = () => {
    setDiscussion((prev) => ({
      ...prev,
      likes: prev.likes + 1
    }));
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const submitComment = (e) => {
    e.preventDefault();
    const comment = {
      id: discussion.comments.length + 1,
      author: 'CurrentUser', // Replace with actual current user
      content: newComment
    };
    setDiscussion((prev) => ({
      ...prev,
      comments: [...prev.comments, comment]
    }));
    setNewComment('');
  };

  if (!discussion) return <div>Loading...</div>;

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="mb-6">
          <p className="text-gray-500 text-sm">{discussion.timeAgo}</p>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{discussion.title}</h1>
          <p className="text-gray-600 text-sm">Partagé par <strong>{discussion.author}</strong></p>
          <p className="text-gray-700 mt-4">{discussion.content}</p>
          <div className="flex items-center justify-between text-gray-500 text-sm mt-4">
            <div className="flex space-x-4">
              <button className="flex items-center text-gray-500 hover:text-gray-700 transition">
                <FaShareAlt className="mr-1" /> Partager
              </button>
              <button className="flex items-center text-gray-500 hover:text-gray-700 transition">
                <FaCommentDots className="mr-1" /> {discussion.comments.length} commentaires
              </button>
            </div>
            <button 
              onClick={handleLike} 
              className="flex items-center text-blue-500 hover:text-blue-700 transition font-semibold"
            >
              <FaThumbsUp className="mr-1" /> Like ({discussion.likes})
            </button>
          </div>
        </div>
        <div className="flex space-x-4 mt-8 mb-4">
          <button className="flex items-center text-gray-500 hover:text-gray-700 transition">
            <FaRegBookmark className="mr-1" /> Sauvegarder
          </button>
          <button className="flex items-center text-gray-500 hover:text-gray-700 transition">
            <FaCommentDots className="mr-1" /> Écrire un commentaire
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg shadow mt-4">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Commentaires</h2>
          {discussion.comments.length > 0 ? (
            discussion.comments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-lg shadow mt-4">
                <p className="text-gray-800">{comment.content}</p>
                <p className="text-gray-500 text-sm mt-1">Posté par <strong>{comment.author}</strong></p>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="flex justify-center items-center mb-4">
                <FaCommentDots className="text-6xl text-blue-500" />
              </div>
              <p className="text-gray-600 text-lg">Une question, un avis ou une suggestion ?</p>
              <button
                onClick={() => document.getElementById('comment-form').scrollIntoView()}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition"
              >
                <FaPen className="mr-2" /> Postez le premier commentaire
              </button>
            </div>
          )}
          <form id="comment-form" onSubmit={submitComment} className="mt-6">
            <textarea
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Votre commentaire"
              required
              className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 transition"
            >
              Poster
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DetailsDiscussion;
