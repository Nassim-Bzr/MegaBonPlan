import React, { useState, useEffect } from 'react';
// Assurez-vous d'importer votre fichier CSS pour les styles
import './CodesPromos.css';

export default function CodesPromos() {
  const [codesPromos, setCodesPromos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/codepromos")
      .then((response) => response.json())
      .then((data) => setCodesPromos(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des codes promos:", error)
      );
  }, []); 

  return (
    <div className="codespromos-container">
      {codesPromos.map((code, index) => (
        <div key={index} className="codepromo">
          <h3 className="codepromo-title">{code.code}</h3>
          <p className="codepromo-description">{code.description}</p>
          {/* Vous pouvez formater la date d'expiration si nécessaire */}
          <p className="codepromo-expiration">Expire le: {code.dateexpiration}</p>
        </div>
      ))}
    </div>
  );
}
