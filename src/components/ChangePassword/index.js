import React, { useState } from 'react'
import { useAuth } from '../../AuthContext' // Importe le hook personnalisé

export default function ChangePassword() {
  const { user } = useAuth() // Accès aux informations de l'utilisateur via le contexte
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setPasswords((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Les mots de passe ne correspondent pas!')
      return
    }

    if (!user || !user.id) {
      alert('ID utilisateur non trouvé ou non défini')
      return
    }

    try {
      const response = await fetch(
        `https://megabonplan-f8522b195111.herokuapp.com/api/utilisateur/${user.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword, // Assurez-vous que le champ dans la DB correspond
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Erreur lors du changement du mot de passe.'
        )
      }

      alert('Mot de passe changé avec succès!')
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="min-h-screen animatedBackground bg-gray-100 flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">
          Changer de mot de passe
        </h2>

        {/* Les champs de formulaire restent inchangés */}

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
        </form>
      </div>
    </div>
  )
}
