import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TbClockHour4 } from "react-icons/tb";
import axios from 'axios';
import { useAuth } from '../../AuthContext';

function Discussions() {
  const [discussions, setDiscussions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth()
  const [newDiscussion, setNewDiscussion] = useState({
    titre: '',
    content: '',
    id_utilisateur: '',
    id_category: ''
  });

  useEffect(() => {
    axios.get("https://megabonplan-f8522b195111.herokuapp.com/api/discussions")
      .then((response) => setDiscussions(response.data))
      .catch((error) => console.error("Erreur lors de la récupération des discussions:", error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDiscussion((prev) => ({ ...prev, [name]: value }));
  };

  const submitNewDiscussion = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://megabonplan-f8522b195111.herokuapp.com/api/discussions', newDiscussion);
      setDiscussions([...discussions, response.data]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Erreur lors de l'ajout de la discussion:", error);
      alert("Erreur lors de l'ajout de la discussion. Veuillez réessayer.");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-50 animatedBackground min-h-screen">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl text-white font-bold mb-4">Discussions</h1>

        {user && (
            <button
            onClick={handleOpenModal}
            className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ajouter une discussion
          </button>
          
        )}

        {!user && (
          
          <p className="text-center text-2xl text-gray-600 mb-12">
            Vous devez vous connecter pour ajouter une discussion.
            </p>
            )}

     
      
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <Link to={`/discussions/${discussion.id_discussion}`} key={discussion.id_discussion}>
              <div className="bg-white m-4 p-4 rounded-lg shadow hover:shadow-lg transition">
                <h2 className="text-gray-600 font-semibold">{discussion.category}</h2>
                <h3 className="text-gray-800 font-semibold mt-2 text-xl">{discussion.titre}</h3>
                {discussion.content && (
                  <p className="mt-2 text-sm text-gray-700">{discussion.content}</p>
                )}
                <div className="flex justify-between items-center text-gray-500 text-sm mt-2">
                  <span>{discussion.id_utilisateur}</span>
                  <span className="flex items-center"><TbClockHour4 className="mr-1" /> il y a {discussion.timeAgo}</span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-gray-600 mr-2">{discussion.comments} 0 commentaires</span>
                  <button className="text-blue-500 hover:text-blue-700 transition">
                    Commenter
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <div className="flex justify-end">
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <h2 className="text-xl font-semibold mb-4">Ajouter une nouvelle discussion</h2>
            <form onSubmit={submitNewDiscussion} className="space-y-4">
              <input
                type="text"
                name="category"
                value={newDiscussion.category}
                onChange={handleInputChange}
                placeholder="Catégorie"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="title"
                value={newDiscussion.title}
                onChange={handleInputChange}
                placeholder="Titre"
                required
                className="w-full p-2 border rounded"
              />
              <textarea
                name="content"
                value={newDiscussion.content}
                onChange={handleInputChange}
                placeholder="Contenu"
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                name="author"
                value={newDiscussion.author}
                onChange={handleInputChange}
                placeholder="Auteur"
                required
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-between items-center">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Soumettre
                </button>
                <button
                  onClick={handleCloseModal}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                >
                  Fermer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Discussions;
