import React, { useState, useEffect } from 'react';
import './bonplans.css';
import { Link } from 'react-router-dom';
import BonPlanCard from '../BonPlanCard/index';
import { useAuth } from '../../AuthContext';
import { FaFilter, FaSortAmountDown, FaTrash, FaEdit } from 'react-icons/fa';

export default function BonPlans() {
  const [bonPlans, setBonPlans] = useState([]);
  const [filteredBonPlans, setFilteredBonPlans] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const { user } = useAuth();
  const [selectedBonPlans, setSelectedBonPlans] = useState(new Set());
  const [isEditing, setIsEditing] = useState(false);
  const [editingBonPlan, setEditingBonPlan] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch('https://megabonplan-f8522b195111.herokuapp.com/api/bonplans').then(res => res.json()),
      fetch('https://megabonplan-f8522b195111.herokuapp.com/api/categories').then(res => res.json())
    ]).then(([bonPlansData, categoriesData]) => {
      const filteredPlans = bonPlansData.filter((bonPlan) => bonPlan.approuvéparadmin);
      setBonPlans(filteredPlans);
      setFilteredBonPlans(filteredPlans);
      setCategories(categoriesData);
    }).catch(error => {
      console.error('Erreur lors de la récupération des données:', error);
    });
  }, []);
  console.log(bonPlans)

  useEffect(() => {
    let result = [...bonPlans];
    if (selectedCategory) {
      result = result.filter(plan => plan.id_categorie === parseInt(selectedCategory));
    }
    if (sortBy === 'price') {
      result.sort((a, b) => a.prix_reduit - b.prix_reduit);
    } else if (sortBy === 'date') {
      result.sort((a, b) => new Date(b.datepost) - new Date(a.datepost));
    }
    setFilteredBonPlans(result);
  }, [selectedCategory, sortBy, bonPlans]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce bon plan ?')) {
      try {
        const response = await fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/bonplans/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}` // Assurez-vous d'avoir le token dans user
          }
        });

        if (response.ok) {
          setBonPlans(bonPlans.filter(plan => plan.id_bonplan !== id));
          setFilteredBonPlans(filteredBonPlans.filter(plan => plan.id_bonplan !== id));
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleEdit = async (bonPlan) => {
    setEditingBonPlan(bonPlan);
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/bonplans/${editingBonPlan.id_bonplan}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(editingBonPlan)
      });

      if (response.ok) {
        const updatedBonPlans = bonPlans.map(plan => 
          plan.id_bonplan === editingBonPlan.id_bonplan ? editingBonPlan : plan
        );
        setBonPlans(updatedBonPlans);
        setFilteredBonPlans(updatedBonPlans);
        setIsEditing(false);
        setEditingBonPlan(null);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleMultipleDelete = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedBonPlans.size} bons plans ?`)) {
      try {
        const deletePromises = Array.from(selectedBonPlans).map(id =>
          fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/bonplans/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
        );

        await Promise.all(deletePromises);
        
        const newBonPlans = bonPlans.filter(plan => !selectedBonPlans.has(plan.id_bonplan));
        setBonPlans(newBonPlans);
        setFilteredBonPlans(newBonPlans);
        setSelectedBonPlans(new Set());
      } catch (error) {
        console.error('Erreur lors de la suppression multiple:', error);
      }
    }
  };

  return (
    <div className="py-8 px-4 bg-gray-100 animatedBackground ">
      <h1 className="text-4xl font-bold text-center text-white mb-6">
        Découvrez les Bons Plans
      </h1>

      {!user && (
        <p className="text-center text-2xl text-gray-600 mb-12">
          Vous devez vous connecter pour ajouter un bon plan.
        </p>
      )}

      <div className="flex justify-evenly items-center mb-8">
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((category) => (
              <option key={category.id_categorie} value={category.id_categorie}>
                {category.nomcategorie}
              </option>
            ))}
          </select>
        </div>

        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-gray-700 focus:outline-none focus:ring focus:border-blue-300"
            value={sortBy}
            onChange={handleSortChange}
          >
            <option value="date">Trier par date</option>
            <option value="price">Trier par prix</option>
          </select>
        </div>
      </div>

      {user?.isadmin && selectedBonPlans.size > 0 && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleMultipleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Supprimer la sélection ({selectedBonPlans.size})
          </button>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-[9999] justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Modifier le bon plan</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block mb-2">Titre</label>
                <input
                  type="text"
                  value={editingBonPlan.titre}
                  onChange={e => setEditingBonPlan({...editingBonPlan, titre: e.target.value})}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Description</label>
                <textarea
                  value={editingBonPlan.description}
                  onChange={e => setEditingBonPlan({...editingBonPlan, description: e.target.value})}
                  className="w-full border rounded-md p-2"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-xl mx-auto">
        {filteredBonPlans.map((bonPlan) => (
          <div key={bonPlan.id_bonplan} className="relative">
            {user?.isadmin && (
              <div className="absolute top-2 right-2 z-10 flex gap-2">
                <input
                  type="checkbox"
                  checked={selectedBonPlans.has(bonPlan.id_bonplan)}
                  onChange={(e) => {
                    const newSelected = new Set(selectedBonPlans);
                    if (e.target.checked) {
                      newSelected.add(bonPlan.id_bonplan);
                    } else {
                      newSelected.delete(bonPlan.id_bonplan);
                    }
                    setSelectedBonPlans(newSelected);
                  }}
                  className="w-4 h-4"
                />
                <button
                  onClick={() => handleEdit(bonPlan)}
                  className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(bonPlan.id_bonplan)}
                  className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            )}
            <BonPlanCard bonPlan={bonPlan} user={user} />
          </div>
        ))}
      </div>
    </div>
  );
}
