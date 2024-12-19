import React, { useState, useEffect } from "react";
import { useAuth } from '../../AuthContext'; // Assurez-vous que le chemin est correct
import { FaTrash, FaEdit } from 'react-icons/fa';

export default function CodesPromos() {
  const [codesPromos, setCodesPromos] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);
  const [newCodePromo, setNewCodePromo] = useState({
    code: '',
    description: '',
    dateexpiration: '',
    approuvéparadmin: false,
    marchand: '',
    imgmarchand: '',
    reduction: '',
    montant: ''
  });
  const [selectedPromos, setSelectedPromos] = useState(new Set());
  const [isEditing, setIsEditing] = useState(false);
  const [editingPromo, setEditingPromo] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    fetch("https://megabonplan-f8522b195111.herokuapp.com/api/codepromos")
      .then((response) => response.json())
      .then((data) => setCodesPromos(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des codes promos:", error)
      );
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCodePromo((prev) => ({ ...prev, [name]: value }));
  };

  const submitNewCodePromo = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('https://megabonplan-f8522b195111.herokuapp.com/api/codepromos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCodePromo),
      });

      const responseData = await response.json();
      if (response.ok) {
        setCodesPromos([...codesPromos, responseData]);
        setIsAddModalOpen(false);
      } else {
        console.error('Failed to upload the code promo:', responseData.message);
        throw new Error(responseData.message || 'Failed to upload the code promo.');
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du code promo:", error);
    }
  };

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleOpenViewModal = (code) => {
    setSelectedCode(code);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedCode(null);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Code copié dans le presse-papiers !");
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce code promo ?')) {
      try {
        const response = await fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/codepromos/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (response.ok) {
          setCodesPromos(codesPromos.filter(promo => promo.id_codepromo !== id));
        }
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  };

  const handleEdit = (promo) => {
    setEditingPromo(promo);
    setIsEditing(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/codepromos/${editingPromo.id_codepromo}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify(editingPromo)
      });

      if (response.ok) {
        setCodesPromos(codesPromos.map(promo => 
          promo.id_codepromo === editingPromo.id_codepromo ? editingPromo : promo
        ));
        setIsEditing(false);
        setEditingPromo(null);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  };

  const handleMultipleDelete = async () => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer ${selectedPromos.size} codes promo ?`)) {
      try {
        const deletePromises = Array.from(selectedPromos).map(id =>
          fetch(`https://megabonplan-f8522b195111.herokuapp.com/api/codepromos/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
        );

        await Promise.all(deletePromises);
        
        setCodesPromos(codesPromos.filter(promo => !selectedPromos.has(promo.id_codepromo)));
        setSelectedPromos(new Set());
      } catch (error) {
        console.error('Erreur lors de la suppression multiple:', error);
      }
    }
  };

  return (
    <div className="animatedBackground bg-[url('../../assets/apple-store-badge.png')] p-8">
      <h1 className="text-4xl font-semibold text-white text-center mb-6">Les codes promos</h1>

      {!user && (
        
        <p className="text-center text-2xl text-gray-600 mb-8">
          Vous devez vous connecter pour ajouter un code promo.
        </p>
      )
      
      
      }

      {user  && (
        <div className="animatedBackground ">
          <div className="flex justify-center mb-4">
            <button
              onClick={handleOpenAddModal}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Ajouter un code promo
            </button>
          </div>
          {isAddModalOpen && (
            <div className="fixed  inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded z-50">
                <form onSubmit={submitNewCodePromo} className="space-y-4">
                  <input
                    type="text"
                    name="code"
                    value={newCodePromo.code}
                    onChange={handleInputChange}
                    placeholder="Code"
                    required
                    className="w-full p-2 border rounded"
                  />
                  <textarea
                    name="description"
                    value={newCodePromo.description}
                    onChange={handleInputChange}
                    placeholder="Description"
                    required
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="date"
                    name="dateexpiration"
                    value={newCodePromo.dateexpiration}
                    onChange={handleInputChange}
                    required
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="marchand"
                    value={newCodePromo.marchand}
                    onChange={handleInputChange}
                    placeholder="Marchand"
                    required
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="url"
                    name="imgmarchand"
                    value={newCodePromo.imgmarchand}
                    onChange={handleInputChange}
                    placeholder="URL de l'image du marchand"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="reduction"
                    value={newCodePromo.reduction}
                    onChange={handleInputChange}
                    placeholder="Réduction"
                    className="w-full p-2 border rounded"
                  />
                  <input
                    type="text"
                    name="montant"
                    value={newCodePromo.montant}
                    onChange={handleInputChange}
                    placeholder="Montant"
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
                      onClick={handleCloseAddModal}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded"
                    >
                      Fermer
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {user?.isadmin && selectedPromos.size > 0 && (
        <div className="mb-4 flex justify-end">
          <button
            onClick={handleMultipleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            Supprimer la sélection ({selectedPromos.size})
          </button>
        </div>
      )}

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full">
            <h2 className="text-2xl font-bold mb-4">Modifier le code promo</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                value={editingPromo.code}
                onChange={e => setEditingPromo({...editingPromo, code: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="Code"
              />
              <textarea
                value={editingPromo.description}
                onChange={e => setEditingPromo({...editingPromo, description: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="Description"
              />
              <input
                type="date"
                value={editingPromo.dateexpiration}
                onChange={e => setEditingPromo({...editingPromo, dateexpiration: e.target.value})}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                value={editingPromo.marchand}
                onChange={e => setEditingPromo({...editingPromo, marchand: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="Marchand"
              />
              <input
                type="text"
                value={editingPromo.reduction}
                onChange={e => setEditingPromo({...editingPromo, reduction: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="Réduction"
              />
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {codesPromos.map((code) => (
          <div key={code.id_codepromo} className="relative bg-white rounded-lg shadow-lg overflow-hidden">
            {user?.isadmin && (
              <div className="absolute top-2 right-2 z-10 flex gap-2">
                <input
                  type="checkbox"
                  checked={selectedPromos.has(code.id_codepromo)}
                  onChange={(e) => {
                    const newSelected = new Set(selectedPromos);
                    if (e.target.checked) {
                      newSelected.add(code.id_codepromo);
                    } else {
                      newSelected.delete(code.id_codepromo);
                    }
                    setSelectedPromos(newSelected);
                  }}
                  className="w-4 h-4"
                />
                <button
                  onClick={() => handleEdit(code)}
                  className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(code.id_codepromo)}
                  className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            )}
            <div className="p-5 flex flex-col items-center">
              <img className="w-20 h-20 object-contain mb-4" src={code.imgmarchand} alt="Logo Marchand" />
              <p className="text-center text-gray-800 font-semibold mb-2">{code.description}</p>
              <p className="text-center text-gray-500 text-sm mb-4">{code.marchand}</p>
              {code.dateexpiration && code.dateexpiration !== 'null' && code.dateexpiration !== '' && (
                <p className="text-gray-500 text-sm mb-4">Expire le: {code.dateexpiration}</p>
              )}
              <button
                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm py-2 px-4"
                onClick={() => handleOpenViewModal(code)}
              >
                Voir le code
              </button>
            </div>
          </div>
        ))}
      </div>

      {isViewModalOpen && selectedCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-lg w-full">
            <div className="flex justify-end">
              <button onClick={handleCloseViewModal} className="text-gray-500 hover:text-gray-700">&times;</button>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <img className="h-24 w-24 object-contain" src={selectedCode.imgmarchand} alt="Logo Marchand" />
              </div>
              <p className="text-xl font-semibold mb-2">{selectedCode.description}</p>
              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <p className="text-lg font-bold">{selectedCode.code}</p>
                <button
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2 px-4 mt-2"
                  onClick={() => copyToClipboard(selectedCode.code)}
                >
                  Copier le code
                </button>
              </div>
              <a href="#" className="text-blue-500 hover:underline">Voir le site du marchand</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
