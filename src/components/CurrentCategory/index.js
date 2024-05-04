import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Pour accéder à l'état global
import { useAuth } from "../../AuthContext"; // Assurez-vous que le chemin est correct
export default function CurrentCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [bonPlans, setBonPlans] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [newBonPlan, setNewBonPlan] = useState({ Titre: '', Description: '', LienAffiliation: '' });
  const { user} = useAuth();

  useEffect(() => {
    fetch(`http://localhost:8080/api/categories/${categoryId}`)
      .then(response => response.json())
      .then(data => {
        setCategoryName(data.nomcategorie);
      })
      .catch(error => console.error('Erreur lors de la récupération du nom de la catégorie:', error));

    fetch(`http://localhost:8080/api/bonplans/category/${categoryId}`)
      .then(response => response.json())
      .then(data => setBonPlans(data))
      .catch(error => console.error('Erreur lors de la récupération des bons plans pour la catégorie:', error));
  }, [categoryId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBonPlan(prev => ({ ...prev, [name]: value }));
  };

  const submitNewBonPlan = (event) => {
    event.preventDefault();
    // Ajouter des vérifications ou des transformations si nécessaire
    fetch('http://localhost:8080/api/bonplans', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newBonPlan, ID_Categorie: categoryId, ApprouveParAdmin: false }),
    })
    .then(response => response.json())
    .then(() => {
      // Recharger les bons plans ou naviguer à un autre écran
      navigate(0); // Rafraîchir la page pour voir le nouveau bon plan
    })
    .catch(error => console.error('Erreur lors de l\'ajout du bon plan:', error));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Bons plans pour la catégorie {categoryName || categoryId}
      </h1>
      {user && (
        <form onSubmit={submitNewBonPlan} className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">Ajouter un nouveau bon plan</h2>
          <input
            type="text"
            name="Titre"
            value={newBonPlan.Titre}
            onChange={handleInputChange}
            placeholder="Titre"
            required
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            name="Description"
            value={newBonPlan.Description}
            onChange={handleInputChange}
            placeholder="Description"
            required
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="url"
            name="LienAffiliation"
            value={newBonPlan.LienAffiliation}
            onChange={handleInputChange}
            placeholder="Lien d'affiliation"
            required
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Soumettre
          </button>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bonPlans.length > 0 ? bonPlans.map((bonPlan, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-blue-800">{bonPlan.Titre}</h2>
            <p className="text-gray-600">{bonPlan.Description}</p>
            <Link
              to={bonPlan.LienAffiliation}
              className="text-indigo-500 hover:text-indigo-600 transition-colors mt-2 inline-block"
            >
              Voir plus
            </Link>
          </div>
        )) : (
          <p className="text-center text-gray-600">Aucun bon plan disponible pour cette catégorie.</p>
        )}
      </div>
    </div>
  );
}
