import React, { useState, useEffect } from "react";
import { useAuth } from '../../AuthContext'; // Assurez-vous que le chemin est correct

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
    fetch("http://localhost:8080/api/codepromos")
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
      const response = await fetch('http://localhost:8080/api/codepromos', {
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
      <h1 className="text-4xl font-semibold text-white text-center mb-10">Les codes promos</h1>
      {user && user.isadmin && (
        <>
          <button
            onClick={handleOpenAddModal}
            className="bg-blue-500 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Ajouter un code promo
          </button>
          {isAddModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {codesPromos.map((code, index) => (
          <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
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
