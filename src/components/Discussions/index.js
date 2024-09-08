import React from 'react';
import { Link } from 'react-router-dom';
import { TbClockHour4 } from "react-icons/tb";
import { FaComments, FaTag } from "react-icons/fa";
import { useAuth } from '../../AuthContext';

const exampleDiscussions = [
  {
    id_discussion: 1,
    category: "Électronique",
    titre: "Meilleur deal PS5 du moment",
    content: "J'ai trouvé une PS5 à un prix incroyable. Quelqu'un d'autre a vu cette offre ?",
    id_utilisateur: "GamerPro",
    timeAgo: "2 heures",
    comments: 15,
    likes: 32
  },
  {
    id_discussion: 2,
    category: "Voyage",
    titre: "Bon plan vol Paris-Tokyo",
    content: "Une compagnie propose des vols à -50% pour Tokyo. Qui est partant ?",
    id_utilisateur: "GlobeTrotter",
    timeAgo: "5 heures",
    comments: 28,
    likes: 45
  },
  {
    id_discussion: 3,
    category: "Mode",
    titre: "Promo sur les sneakers",
    content: "J'ai repéré une promo intéressante sur des sneakers de marque. Ça intéresse quelqu'un ?",
    id_utilisateur: "FashionLover",
    timeAgo: "1 jour",
    comments: 7,
    likes: 19
  },
  {
    id_discussion: 4,
    category: "Alimentation",
    titre: "Réduction sur les produits bio",
    content: "Un nouveau magasin bio propose 30% de réduction sur tout le magasin cette semaine !",
    id_utilisateur: "HealthyEater",
    timeAgo: "3 jours",
    comments: 22,
    likes: 38
  }
];

function Discussions() {
  const { user } = useAuth();

  return (
    <div className='animatedBackground'>
      <div style={{ backgroundColor: "gray.50", minHeight: "100vh", padding: "8px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ marginBottom: "8px" }}>
            <button style={{ backgroundColor: "blue", color: "white", padding: "4px 8px", borderRadius: "4px", fontSize: "14px" }}>
              Ajouter une discussion
            </button>
          </div>

          {!user && (
            <div style={{ textAlign: "center", color: "gray", fontSize: "18px", marginBottom: "24px" }}>
              Vous devez vous connecter pour ajouter une discussion.
            </div>
          )}

          <div>
            {exampleDiscussions.map((discussion) => (
              <Link to={`/discussions/${discussion.id_discussion}`} key={discussion.id_discussion}>
                <div 
                  style={{ 
                    backgroundColor: "white", 
                    margin: "8px", 
                    padding: "8px", 
                    borderRadius: "8px", 
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
                    transition: "all 0.3s" 
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)"}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)"}
                >
                  <div style={{ fontSize: "16px", fontWeight: "600", color: "blue" }}>{discussion.category}</div>
                  <div style={{ fontSize: "18px", fontWeight: "600", marginTop: "4px", color: "gray" }}>{discussion.titre}</div>
                  {discussion.content && (
                    <div style={{ marginTop: "4px", fontSize: "12px", color: "gray" }} noOfLines={2}>{discussion.content}</div>
                  )}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px", color: "gray", fontSize: "12px" }}>
                    <div>{discussion.id_utilisateur}</div>
                    <div style={{ display: "flex", alignItems: "center" }}><TbClockHour4 style={{ marginRight: "4px" }} /> il y a {discussion.timeAgo}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", marginTop: "4px", justifyContent: "space-between" }}>
                    <div style={{ color: "gray", display: "flex", alignItems: "center" }}>
                      <FaComments style={{ marginRight: "4px" }} /> {discussion.comments}
                    </div>
                    <div style={{ color: "gray", display: "flex", alignItems: "center" }}>
                      <FaTag style={{ marginRight: "4px" }} /> {discussion.likes}
                    </div>
                    <button style={{ color: "blue", background: "none", border: "none", cursor: "pointer", fontSize: "12px" }}>Commenter</button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Discussions;
