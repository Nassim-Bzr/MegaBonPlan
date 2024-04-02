import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import image1 from '../../assets/slider-consoles-ps5-slim-standard-et-digital-multi.jpeg';
import image2 from '../../assets/avatar-4k-collector-visuel-slider-v2-_1_.jpeg';
import image3 from '../../assets/SLIDER-gta-6-ps5-visuel-provisoire-v2.jpeg';
import imagePrev from '../../assets/fleche (1).png'; // image de la flèche gauche
import imageNext from '../../assets/fleche.png'; // image de la flèche droite

export default function Home() {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [image1, image2, image3];

  const nextSlide = () => {
    setCurrentImage((current) => (current + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentImage((current) => (current - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full select-none h-screen overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        {images.map((img, index) => (
          <Transition
            key={index}
            as="img"
            src={img}
            alt={`Slide ${index}`}
            enter="ease-out duration-700"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-700"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show={index === currentImage}
            className="w-full h-full object-cover absolute inset-0"
          />
        ))}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 rounded-full p-1"
        onClick={prevSlide}
      >
        <img src={imagePrev} alt="Previous" className="h-8 w-8" />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-700 bg-opacity-50 rounded-full p-1"
        onClick={nextSlide}
      >
        <img src={imageNext} alt="Next" className="h-8 w-8" />
      </button>
    </div>
  );
}
