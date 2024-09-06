import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import { FaUser, FaEnvelope, FaCalendarAlt, FaImage, FaSave, FaTimes } from 'react-icons/fa';

const ModifierProfil = () => {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    dateNaissance: '',
    imageUrl: '',
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (user) {
      setFormData({
        nom: user.nom || '',
        email: user.email || '',
        dateNaissance: user.dateNaissance || '',
        imageUrl: user.imageUrl || '',
      });
      setPreviewImage(user.imageUrl || null);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData(prevState => ({
          ...prevState,
          imageUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      alert('Profil mis à jour avec succès !');
      navigate('/profil');
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      alert('Une erreur est survenue lors de la mise à jour du profil.');
    }
  };

  return (
    <div className="min-h-screen animatedBackground py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <div className="h-48 w-full object-cover md:w-48 bg-gray-200 flex items-center justify-center">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <FaUser className="text-gray-400 text-4xl" />
              )}
            </div>
          </div>
          <div className="p-8 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Modifier votre profil</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaUser className="w-4 h-4 mr-2 text-gray-500" />
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  id="nom"
                  value={formData.nom}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaEnvelope className="w-4 h-4 mr-2 text-gray-500" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="dateNaissance" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaCalendarAlt className="w-4 h-4 mr-2 text-gray-500" />
                  Date de naissance
                </label>
                <input
                  type="date"
                  name="dateNaissance"
                  id="dateNaissance"
                  value={formData.dateNaissance}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700 flex items-center">
                  <FaImage className="w-4 h-4 mr-2 text-gray-500" />
                  Photo de profil
                </label>
                <input
                  type="file"
                  name="imageUrl"
                  id="imageUrl"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="mt-1 block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-700
                    hover:file:bg-indigo-100"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/profil')}
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifierProfil;