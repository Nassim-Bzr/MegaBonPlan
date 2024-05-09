import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/Votre texte de paragraphe.png'
import { useAuth } from '../../AuthContext'

const Header = () => {
  const { user, logout } = useAuth()

  console.log(user)
  const handleLogout = () => {
    logout()
  }

  // Liste des éléments de navigation
  const navItems = [
    { title: 'Catégories', path: '/category' },
    { title: 'Bon Plans', path: '/bonsplans' },
    { title: 'Codes Promos', path: '/codespromos' },
    { title: 'Discussions', path: '/discussions' },
    { title: 'Contact', path: '/contact' },
    { title: 'FAQ', path: '/faq' },
  ]

  // Insertion de "Favoris" avant "FAQ" si l'utilisateur est connecté
  if (user) {
    const faqIndex = navItems.findIndex((item) => item.title === 'FAQ')
    navItems.splice(faqIndex, 0, { title: 'Favoris', path: '/favoris' })
  }

  return (
    <nav className="bg-white md:text-sm shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0">
      <div className="max-w-screen-xl mx-auto px-4 md:flex md:px-8">
        <div className="flex justify-between items-center py-3 md:py-5">
          <Link to="/">
            <img src={Logo} alt="Logo" width={120} height={50} />
          </Link>
          <button className="md:hidden">

          </button>
        </div>
        <div className="flex-1 md:flex md:items-center md:justify-between">
          <ul className="space-y-4 md:flex md:space-x-8 md:space-y-0">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="text-gray-700 hover:text-gray-900"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          {user ? (
            <div className="flex items-center space-x-4">
              <span>Bonjour, {user.nom}</span>
              <Link
                to="/profil"
                className="py-2 px-4 text-white bg-blue-500 hover:bg-blue-700 rounded"
              >
                Profil
              </Link>
         
            </div>
          ) : (
            <div className="mt-4 md:mt-0">
              <Link to="/connexion" className="mr-4">
                Connexion
              </Link>
              <Link
                to="/inscription"
                className="py-2 px-4 text-white bg-blue-500 hover:bg-blue-700 rounded"
              >
                Inscription
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Header
