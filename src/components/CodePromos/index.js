import {React,  useState, useEffect } from "react";

import Logo from "../../assets/Votre texte de paragraphe.png";
import Promo from "../../assets/promo.png";

export default function CodesPromos() {
  const [codesPromos, setCodesPromos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/codepromos")
      .then((response) => response.json())
      .then((data) => setCodesPromos(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des codes promos:", error)
      );
  }, []);

  const handleOpenModal = (code) => {
    setSelectedCode(code);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="animatedBackground p-8">
      <h1 className="text-4xl font-semibold text-white text-center mb-10">Les codes promos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {codesPromos.map((code, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-5">

              <p className="text-gray-600 mt-2">{code.description}</p>
              <p className="text-gray-500 text-sm mt-2">Expire le: {code.dateexpiration}</p>
              <div className="grid grid-cols-8 gap-2 mt-4">
                <input type="text"
                  className="col-span-6 bg-gray-50 border border-gray-300 text-gray-500 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  value={code.code}
                  readOnly
                />
                <button className="col-span-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full py-2.5 text-center"
                  onClick={() => navigator.clipboard.writeText(code.code)}>
                  Copier
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg max-w-sm w-full mx-auto">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-indigo-600">Votre Code Promo</h2>
              <button onClick={handleCloseModal} className="text-indigo-600">
                <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-3 text-center">
              <img src={Logo} alt="Logo" className="mx-auto mb-4" />
              <p className="text-xl font-semibold text-gray-700 mb-4">{selectedCode?.code}</p>
              <p className="mb-4 text-gray-500">{selectedCode?.description}</p>
            </div>
            <button onClick={handleCloseModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition duration-300 ease-in-out float-right mt-4">
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
