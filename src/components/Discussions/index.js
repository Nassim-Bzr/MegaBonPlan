import React, { useState } from "react";
// Importez ou définissez le composant Modal si nécessaire
import Modal from "../Modal/index";
import "./Discussions.css";
export default function Discussions() {
  const [discussions] = useState([
    {
      id: 1,
      titre: "Discussion sur React",
      username: "JeanDev",
      date: new Date("2023-04-04T14:00:00Z").toLocaleString(),
      resume: "Quels sont vos composants préférés ?",
      messages: [
        { id: 1, username: "Alice", content: "J'aime bien les hooks !" },
        { id: 2, username: "Bob", content: "Les contextes sont super utiles." },
      ],
    },
    // Autres discussions...
  ]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = (discussion) => {
    setSelectedDiscussion(discussion);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDiscussion(null);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8 animatedBackground">
      <h1 className="text-4xl font-semibold text-white text-center mb-10">
        Discussions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {discussions.map((discussion) => (
          <div
            key={discussion.id}
            className="group relative rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 bg-white cursor-pointer"
            onClick={() => handleOpenModal(discussion)}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {discussion.titre}
              </h3>
              <p className="text-gray-600 mb-4">{discussion.resume}</p>
              <div className="absolute bottom-0 left-0 p-6 w-full flex justify-between items-center text-sm">
                <span className="text-gray-600">{discussion.username}</span>
                <span className="text-gray-400">{discussion.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <Modal onClose={handleCloseModal} title={selectedDiscussion.titre}>
          <div className="space-y-4">
            {selectedDiscussion.messages.map((message) => (
              <div key={message.id} className="p-4 bg-white rounded shadow">
                <div className="font-semibold">{message.username}</div>
                <p>{message.content}</p>
              </div>
            ))}
            {/* Formulaire pour ajouter un message */}
            <form onSubmit={(e) => e.preventDefault()} className="pt-4">
              <textarea
                className="w-full p-2 border rounded"
                placeholder="Votre message"
              ></textarea>
              <button
                type="submit"
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
              >
                Envoyer
              </button>
            </form>
          </div>
        </Modal>
      )}
    </div>
  );
}
