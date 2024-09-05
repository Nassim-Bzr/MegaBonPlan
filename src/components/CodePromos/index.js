import React, { useState, useEffect } from "react";
import { useAuth } from '../../AuthContext';
import { FaTag, FaClock, FaStore } from 'react-icons/fa';

// Ajout de faux codes promos
const fakeCodesPromos = [
  {
    id: 1,
    code: "SUMMER25",
    description: "25% de réduction sur la collection été",
    dateexpiration: "2023-08-31",
    marchand: "FashionStore",
    imgmarchand: "https://via.placeholder.com/150",
    reduction: "25%",
    montant: ""
  },
  {
    id: 2,
    code: "TECH50",
    description: "50€ de remise sur les smartphones",
    dateexpiration: "2023-09-15",
    marchand: "TechWorld",
    imgmarchand: "https://via.placeholder.com/150",
    reduction: "",
    montant: "50€"
  },
  {
    id: 3,
    code: "BEAUTY10",
    description: "10% sur tous les produits de beauté",
    dateexpiration: "2023-10-01",
    marchand: "BeautyZone",
    imgmarchand: "https://via.placeholder.com/150",
    reduction: "10%",
    montant: ""
  },
  {
    id: 4,
    code: "BOOKS5",
    description: "5€ de réduction sur les livres",
    dateexpiration: "2023-09-30",
    marchand: "BookWorm",
    imgmarchand: "https://via.placeholder.com/150",
    reduction: "",
    montant: "5€"
  },
  {
    id: 5,
    code: "FOOD20",
    description: "20% sur votre première commande",
    dateexpiration: "2023-08-20",
    marchand: "FoodDelivery",
    imgmarchand: "https://via.placeholder.com/150",
    reduction: "20%",
    montant: ""
  }
];

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

  const { user } = useAuth();

  useEffect(() => {
    // Simuler le chargement des codes promos depuis l'API
    setTimeout(() => {
      setCodesPromos([...fakeCodesPromos]);
    }, 1000);
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

  return (
    <div className="animatedBackground p-8">
      <h1 className="text-4xl font-semibold text-white text-center mb-6">Les codes promos</h1>

      {!user && (
        <p className="text-center text-2xl text-gray-300 mb-8">
          Vous devez vous connecter pour ajouter un code promo.
        </p>
      )}

      {user && (
        <>
          <button
            onClick={handleOpenAddModal}
            className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ajouter un code promo
          </button>
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
        </>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {codesPromos.map((code) => (
          <div key={code.id} className="bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="p-5 flex flex-col items-center">
              <img className="w-20 h-20 object-contain mb-4" src={code.imgmarchand} alt={`Logo ${code.marchand}`} />
              <h3 className="text-lg font-semibold text-center text-gray-800 mb-2">{code.marchand}</h3>
              <p className="text-center text-gray-600 mb-4">{code.description}</p>
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
                <FaClock />
                <span>Expire le: {code.dateexpiration}</span>
              </div>
              <button
                className="flex items-center justify-center space-x-2 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm py-2 px-4 transition duration-300"
                onClick={() => handleOpenViewModal(code)}
              >
                <FaTag />
                <span>Voir le code</span>
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
                <img className="h-24 w-24 object-contain" src={selectedCode.imgmarchand} alt={`Logo ${selectedCode.marchand}`} />
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
