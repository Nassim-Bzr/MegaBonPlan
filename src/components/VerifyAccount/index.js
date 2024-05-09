import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function VerifyAccount() {
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    // Récupérer l'email du localStorage
    const storedEmail = localStorage.getItem('emailForVerification')
    if (!storedEmail) {
      // Rediriger l'utilisateur si l'email n'est pas trouvé
      navigate('/connexion') // Assurez-vous que cette route est correcte
    }
  }, [navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const email = localStorage.getItem('emailForVerification')
    const payload = { email, code }

    try {
      const response = await fetch(
        'http://localhost:8080/api/utilisateur/verify',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      )

      const data = await response.json()

      if (response.ok) {
        localStorage.removeItem('emailForVerification')
        navigate('/somewhere-after-success') // Assurez-vous de rediriger l'utilisateur après succès
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Vérifiez votre compte
        </h1>
        {message && <p className="text-red-500 text-center">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code de vérification"
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Vérifier le compte
          </button>
        </form>
      </div>
    </div>
  )
}
