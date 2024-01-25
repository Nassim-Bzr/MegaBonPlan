import React, { useState } from 'react';
import image1 from '../../assets/slider-consoles-ps5-slim-standard-et-digital-multi.jpeg';
import image2 from '../../assets/avatar-4k-collector-visuel-slider-v2-_1_.jpeg';
import image3 from '../../assets/SLIDER-gta-6-ps5-visuel-provisoire-v2.jpeg';
import './home.css'

export default function Home() {
  // Images de vos produits (remplacez par les chemins de vos propres images)
  const productImages = [
    image1,
    image2,
    image3
    // Ajoutez autant d'images que nécessaire
  ];

  // État pour suivre l'image actuellement affichée
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fonction pour aller à l'image précédente
  const goToPrevious = () => {
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage ? productImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  // Fonction pour aller à l'image suivante
  const goToNext = () => {
    const isLastImage = currentImageIndex === productImages.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className='home'> 
      <button onClick={goToPrevious}>Précédent</button>
      <img src={productImages[currentImageIndex]} alt="Produit" className='img-home'/>
      <button onClick={goToNext}>Suivant</button>
    </div>
  );
}
