import React, { useState, useEffect } from "react";
import "./Discussions.css"; // N'oubliez pas de créer ce fichier CSS pour styliser votre page

export default function Discussions() {
  const [discussions, setDiscussions] = useState([]);
  const [selectedDiscussion, setSelectedDiscussion] = useState(null);
  const [messages, setMessages] = useState([]);

  // Récupération des discussions depuis l'API
  useEffect(() => {
    fetch("http://localhost:8080/discussions")
      .then((response) => response.json())
      .then((data) => setDiscussions(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des discussions:", error)
      );
  }, []);

  // Récupération des messages pour une discussion sélectionnée
  useEffect(() => {
    if (selectedDiscussion) {
      fetch(`http://localhost:8080/messages?discussionId=${selectedDiscussion}`)
        .then((response) => response.json())
        .then((data) => setMessages(data))
        .catch((error) =>
          console.error("Erreur lors de la récupération des messages:", error)
        );
    }
  }, [selectedDiscussion]);

  return (
    <div className="discussions-container">
      cc
      {discussions.map((discussion, index) => (
        <div key={index} className="discussion">
          <div className="discussion-header">
            <h2 className="discussion-title">{discussion.titre}</h2>
            <span className="discussion-time">
              {/* Formattez la date et l'heure ici */}
            </span>
          </div>
          <div className="discussion-content">
            <p>
              {/* Ici irait un résumé ou le contenu initial de la discussion */}
            </p>
          </div>
          <div className="discussion-footer">
            <div className="discussion-user">
              <div className="user-avatar">N</div>{" "}
              {/* La lettre pourrait être les initiales de l'utilisateur */}
              <span className="user-name">{discussion.username}</span>
            </div>
            <div className="discussion-actions">
              <button
                className="action-icon"
                onClick={() => {
                  /* fonction de réponse ici */
                }}
              >
                <i className="fas fa-reply"></i> {/* Icône de réponse */}
              </button>
              <button
                className="action-icon"
                onClick={() => {
                  /* fonction de favori ici */
                }}
              >
                <i className="fas fa-star"></i> {/* Icône de favori */}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
