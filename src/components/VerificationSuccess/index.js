import React from 'react';
import { useNavigate } from "react-router-dom";

export default function VerificationSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-green-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-600">Félicitations !</h1>
        <p className="my-4">Votre compte a été vérifié avec succès.</p>
        <button onClick={() => navigate('/')} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Aller à l'accueil
        </button>
      </div>
    </div>
  );
}
