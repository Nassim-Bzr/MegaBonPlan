import React, { useState, useEffect } from "react";
import "./Category.css"; 

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des catégories:", error)
      );
  }, []); 

  console.log(categories);
  return (
    <div className="category-container">
      {categories.map((category, index) => (
        <div key={index} className="category">
          <img
            src="../../assets/apple-store-badge.png"
            alt={category.nomcategorie}
            className="category-icon"
          />
          <h3 className="category-title">{category.nomcategorie}</h3>
        </div>
      ))}
    </div>
  );
}
