import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BonPlanCard from '../BonPlanCard/index';
import { useAuth } from '../../AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CurrentCategory() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const [bonPlans, setBonPlans] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [newBonPlan, setNewBonPlan] = useState({
    Titre: '',
    Description: '',
    LienAffiliation: '',
    imglink: '',
    prix_initial: '',
    prix_reduit: ''
  });
  const { user } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/categories/${categoryId}`)
      .then((response) => response.json())
      .then((data) => {
        setCategoryName(data.nomcategorie);
      })
      .catch((error) => console.error('Erreur lors de la récupération du nom de la catégorie:', error));

    fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/bonplans/category/${categoryId}`)
      .then((response) => response.json())
      .then(async (data) => {
        const filteredPlans = data.filter((bonPlan) => bonPlan.approuvéparadmin);
        
        // Fetch comments for each bon plan
        const bonPlansWithComments = await Promise.all(filteredPlans.map(async (bonPlan) => {
          const commentsResponse = await fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/commentary/bonplan/${bonPlan.id_bonplan}`);
          const comments = await commentsResponse.json();
          return { ...bonPlan, commentaires: comments };
        }));

        setBonPlans(bonPlansWithComments);
      })
      .catch((error) => console.error('Erreur lors de la récupération des bons plans pour la catégorie:', error));
  }, [categoryId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBonPlan((prev) => ({ ...prev, [name]: value }));
  };

  const submitNewBonPlan = async (event) => {
    event.preventDefault();

    if (!user) {
      toast.error("Vous devez être connecté pour ajouter un bon plan.");
      return;
    }

    const bonPlanData = {
      titre: newBonPlan.Titre,
      description: newBonPlan.Description,
      lienAffiliation: newBonPlan.LienAffiliation,
      imglink: newBonPlan.imglink,
      prix_initial: parseFloat(newBonPlan.prix_initial),
      prix_reduit: parseFloat(newBonPlan.prix_reduit),
      id_categorie: categoryId,
      id_utilisateur: user.id,
      approuveparadmin: false,
    };

    try {
      const response = await fetch('https://megabonplan-f8522b195111.herokuapp.com/api/bonplans', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bonPlanData),
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("Bon plan ajouté!");
        navigate(0);
      } else {
        throw new Error(responseData.message || 'Failed to upload the bon plan.');
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du bon plan:", error);
    }
  };

  return (
    <div className="min-h-screen animatedBackground bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-white mb-6">
        Bons plans pour la catégorie {categoryName || categoryId}
        {!user && (
        
        <p className="text-center text-gray-600">
          Vous devez vous connecter pour ajouter un bon plan.
        </p>
      )
      
      
      }
     
      </h1>
  

      <ToastContainer />
      {user && (
        <>
          <button
            onClick={openModal}
            className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ajouter un bon plan
          </button>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded z-50">
                <form onSubmit={submitNewBonPlan} className="space-y-4">
                  <input
                    type="text"
                    name="Titre"
                    value={newBonPlan.Titre}
                    onChange={handleInputChange}
                    placeholder="Titre"
                    required
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    name="Description"
                    value={newBonPlan.Description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="url"
                    name="imglink"
                    value={newBonPlan.imglink}
                    onChange={handleInputChange}
                    placeholder="URL de l'image"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="url"
                    name="LienAffiliation"
                    value={newBonPlan.LienAffiliation}
                    onChange={handleInputChange}
                    placeholder="Lien d'affiliation"
                    required
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    name="prix_initial"
                    value={newBonPlan.prix_initial}
                    onChange={handleInputChange}
                    placeholder="Prix initial"
                    required
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="number"
                    name="prix_reduit"
                    value={newBonPlan.prix_reduit}
                    onChange={handleInputChange}
                    placeholder="Prix réduit"
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
                      onClick={closeModal}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                    >
                      Fermer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bonPlans.length > 0 ? (
          bonPlans.map((bonPlan, index) => (
            <BonPlanCard key={index} bonPlan={bonPlan} user={user} />
          ))
        ) : (
          <p className="text-center text-gray-600">
            Aucun bon plan disponible pour cette catégorie.
          </p>
        )}
      </div>
    </div>
  );
}
