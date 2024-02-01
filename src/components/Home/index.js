import React, { useState } from 'react';
import image1 from '../../assets/slider-consoles-ps5-slim-standard-et-digital-multi.jpeg';
import image2 from '../../assets/avatar-4k-collector-visuel-slider-v2-_1_.jpeg';
import image3 from '../../assets/SLIDER-gta-6-ps5-visuel-provisoire-v2.jpeg';
import image5 from '../../assets/fleche.png';
import image4 from '../../assets/fleche (1).png';

import './home.css'

export default function Home() {
  // Images de vos produits (remplacez par les chemins de vos propres images)
  const productImages = [
    image1,
    image2,
    image3
    // Ajoutez autant d'images que nécessaire
  ];
  const [slideDirection, setSlideDirection] = useState('');

  const [isAnimating, setIsAnimating] = useState(false);

  // État pour suivre l'image actuellement affichée
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fonction pour aller à l'image précédente
  const goToPrevious = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('left');
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage ? productImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    setTimeout(() => {
      setIsAnimating(false);
      setSlideDirection('');
    }, 500); // Durée de votre animation
  };
  

  // Fonction pour aller à l'image suivante
  const goToNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('right');
    const isLastImage = currentImageIndex === productImages.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    setTimeout(() => {
      setIsAnimating(false);
      setSlideDirection('');
    }, 500); // Durée de votre animation
  };

  return (
    <div className='home'> 
      {productImages.map((image, index) => {
        let className = 'img-home';
        if (index === currentImageIndex) {
          className += ' entering';
        } else if (index === currentImageIndex - 1 || (currentImageIndex === 0 && index === productImages.length - 1)) {
          className += ' leaving';
        }
  
        return (
          <div key={image} className="image-container">
            <img src={image} alt={`Produit ${index}`} className={className} />
            {/* Assurez-vous que le lien ci-dessous pointe vers l'URL de votre deal */}
            <a href="/lien-vers-le-deal" className="deal-button">Voir le deal 🔗</a>
          </div>
        );
      })}
      <img className='fleche-gauche' src={image4} onClick={goToPrevious} alt='Précédent'/>
      <img className='fleche-droite' src={image5} onClick={goToNext} alt='Suivant'/>
    </div>
  );
    }  