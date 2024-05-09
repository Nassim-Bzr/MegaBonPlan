import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../AuthContext'

const BonPlanDetails = () => {
  const { id } = useParams()
  const [bonPlan, setBonPlan] = useState(null)
  const [comment, setComment] = useState('')
  const { user } = useAuth()

  useEffect(() => {
    fetch(`http://localhost:8080/api/bonplans/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data) // Afficher les données récupérées pour débogage
        setBonPlan(data)
      })
      .catch((error) =>
        console.error('Erreur lors de la récupération du bon plan:', error)
      )
  }, [id])

  const handleDeleteComment = (commentId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      fetch(`http://localhost:8080/api/commentary/${commentId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            setBonPlan((prevState) => ({
              ...prevState,
              commentaires: prevState.commentaires.filter(
                (comment) => comment.id_commentaire !== commentId
              ),
            }))
            alert('Commentaire supprimé avec succès')
          } else {
            alert('Erreur lors de la suppression du commentaire')
          }
        })
        .catch((error) =>
          console.error('Erreur lors de la suppression:', error)
        )
    }
  }

  const handleCommentChange = (event) => {
    setComment(event.target.value)
  }

  const submitComment = async (event) => {
    event.preventDefault()
    if (comment.trim() && user) {
      const requestBody = {
        contenu: comment,
        id_bonplan: id,
        id_utilisateur: user.id,
      }

      try {
        const response = await fetch(`http://localhost:8080/api/commentary`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        })

        const data = await response.json()

        if (response.ok) {
          setBonPlan((prev) => ({
            ...prev,
            commentaires: [...prev.commentaires, data],
          }))
          setComment('') // Réinitialiser le commentaire
        } else {
          throw new Error(data.message || 'Error posting comment')
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout du commentaire:", error)
      }
    }
  }

  if (!bonPlan) return <div className="text-center">Chargement...</div>

  return (
    <div className=" animatedBackground   mx-auto p-4">
      <div className=" max-w-4xl mr-auto ml-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={bonPlan.imglink}
          alt={bonPlan.Titre}
          className="w-full h-64 object-cover m-4"
        />
        <div className="p-4">
          <h1 className="text-3xl font-bold mb-2">{bonPlan.Titre}</h1>
          <p className="text-gray-700 mb-4">{bonPlan.Description}</p>
          <a
            href={bonPlan.LienAffiliation}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Visitez le lien
          </a>
          <button
            type="button"
            class="text-blue-700 m-4 top-1 left-3 flex relative border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500"
          >
            <svg
              class="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
            </svg>
            <span class="sr-only">Icon description</span>
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold">Commentaires</h2>

          {bonPlan.commentaires &&
            bonPlan.commentaires.map((comment) => (
              <div
                key={comment.id_commentaire}
                className="bg-gray-100 p-2 rounded-lg mt-2"
              >
                <p>{comment.contenu}</p>
                <div className="text-sm text-gray-600">
                  Posté le:{' '}
                  {new Date(comment.datecommentaire).toLocaleDateString()}
                </div>
                {user?.isadmin && (
                  <button
                    onClick={() => handleDeleteComment(comment.id_commentaire)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                )}
              </div>
            ))}

          {user && (
            <form onSubmit={submitComment} className="mt-4">
              <textarea
                className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="3"
                placeholder="Ajoutez un commentaire..."
                value={comment}
                onChange={handleCommentChange}
              ></textarea>
              <button
                type="submit"
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Poster
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default BonPlanDetails
