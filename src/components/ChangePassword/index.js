import React, { useState } from 'react';
import { useAuth } from '../../AuthContext'; // Importe le hook personnalisé
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';


export default function ChangePassword() {
  const { user } = useAuth(); // Accès aux informations de l'utilisateur via le contexte
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Les mots de passe ne correspondent pas!');
      return;
    }
  
    if (!user || !user.id) {
      alert('ID utilisateur non trouvé ou non défini');
      return;
    }
  
    console.log(`ID Utilisateur: ${user.id}`); // Ajout de console.log
  
    try {
      const response = await axios.put(
         `http://localhost:8080/api/utilisateur/password/${user.id}`,
        
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      toast.succes("Mot de passe changé avec succes!")
      alert('Mot de passe changé avec succès!');
    } catch (error) {
      toast.error("Mot de passe  pas changé avec succes!")
      alert(error.response?.data?.message || error.message);
    }
  };
  
  return (
    <div className="min-h-screen animatedBackground bg-gray-100 flex items-center justify-center">
      <div className="max-w-md mx-2 w-full bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Changer de mot de passe
        </h2>
      
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="oldPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Ancien mot de passe
            </label>
            <input
              type="password"
              name="oldPassword"
              id="oldPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={passwords.oldPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Nouveau mot de passe
            </label>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={passwords.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirmer le nouveau mot de passe
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={passwords.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Changer le mot de passe
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
}
