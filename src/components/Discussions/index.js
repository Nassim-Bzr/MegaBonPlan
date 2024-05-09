import React from 'react';
import { TbClockHour4 } from "react-icons/tb";

const discussions = [
  {
    id: 1,
    category: 'Culture & Divertissement',
    title: 'Bon plan pour le Cinépass Pathé-Gaumont',
    author: 'Florian-kun',
    timeAgo: '53 min',
    comments: 1
  },
  {
    id: 2,
    category: 'High-tech & informatique',
    title: 'Upgrade setup haut parleur',
    content: "Bonjour,  J'aurai besoin de souscrire un abonnement mensuel pour prendre le TER jusqu'à Paris. J'ai bien trouvé la page pour l'abonnement :  https://www.sncf-connect.com/app/catalogue/descri...",
    author: 'tneciv_sam',
    timeAgo: '2 h et 20 min',
    comments: 4
  },
  {
    id: 3,
    category: 'Gaming',
    title: 'Achat store turc',
    author: 'Elhadi_Elghamart',
    timeAgo: '3 h et 42 min',
    comments: 0
  }
];

function Discussions() {
  return (
    <div className="bg-gray-50 animatedBackground min-h-screen">
      <div className="max-w-4xl mx-auto p-4">
        <h1 className="text-3xl text-white font-bold mb-4">Discussions</h1>
        <div className="space-y-4">
          {discussions.map((discussion) => (
            <div key={discussion.id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-gray-600 font-semibold">{discussion.category}</h2>
              <h3 className="text-gray-800 font-semibold mt-2 text-xl">{discussion.title}</h3>
              {discussion.content && (
                <p className="mt-2 text-sm text-gray-700">{discussion.content}</p>
              )}
              <div className="flex justify-between items-center text-gray-500 text-sm mt-2">
                <span>{discussion.author}</span>
                <span><TbClockHour4 /> il y a {discussion.timeAgo}</span>
              </div>
              <div className="flex items-center mt-2">
                <span className="text-gray-600 mr-2">{discussion.comments} commentaires</span>
                <button className="text-blue-500 hover:text-blue-700 transition">
                  Commenter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Discussions;
