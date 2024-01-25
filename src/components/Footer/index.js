import React from 'react'
import './footer.css'
import logo1 from '../../assets/apple-store-badge.png'
import logo2 from '../../assets/google-play-badge.png'

export default function Footer() {
  return (
    <div className='footer'> 
    <div className='footer-margin'>
      <p className='text-download'>
      TÉLÉCHARGER L'APPLICATION MOBILE
      </p>
      <img className='logo1' src={logo1}></img>
      <img className='logo2'  src={logo2}></img>
      <div className='div-whoarewe'>
      <p className='text-whoarewe'>
        QUI SOMME-NOUS ? 
        <p className='texte-whoarewe'>
        ChocoBonPlan.com est le 1er site web sur l'actualité des bons plans et précommandes Jeux Vidéo, Blu Ray et Produits Dérivés en France.
        </p>
      </p>
      </div>
      <div className='div-offre'>
      <p className='text-whoarewe'>
      OFFRES 
        <p className='texte-offre'>
        Retrouvez au quotidien les meilleures offres Jeux Vidéo, Blu Ray et Produits Dérivés. Ne manquez plus aucune offre grâce à l'application mobile disponible sur Android et pour iPhone.
        </p>
      </p>
      </div>
      <div className='div-preco'>
      <p className='text-whoarewe'>
      PRECOMMANDES
        <p className='texte-preco'>
        Retrouvez au quotidien les meilleures offres Jeux Vidéo, Blu Ray et Produits Dérivés. Ne manquez plus aucune offre grâce à l'application mobile disponible sur Android et pour iPhone.
        </p>
      </p>
      </div>

    </div>
      </div>

  )
}
