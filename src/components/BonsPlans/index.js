import React, { useState, useEffect } from "react";
import './bonplans.css'
// Assurez-vous d'avoir le CSS nécessaire pour le style de vos bons plans

export default function BonPlans() {
  const [bonPlans, setBonPlans] = useState([]);

  useEffect(() => {
    // Modifier l'URL selon votre configuration de l'API
    fetch("http://localhost:8080/bonsplans")
      .then((response) => response.json())
      .then((data) => setBonPlans(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des bons plans:", error)
      );
  }, []);

  return (
    <div>
      <h2>Bon plans</h2>
      <div className="bonplans-container">
        {bonPlans.map((bonPlan, index) => (
          <div key={index} className="bonplan">
            <h3>{bonPlan.titre}</h3>
            <p>{bonPlan.description}</p>
            {/* Assurez-vous de gérer correctement le lien d'affiliation */}
            <a
              href={bonPlan.lienaffiliation}
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir l'offre
            </a>
            {/* Ajouter plus de détails sur le bon plan si nécessaire */}
          </div>
        ))}
      </div>
    </div>
  );
}
