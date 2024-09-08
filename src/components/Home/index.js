import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useAuth } from '../../AuthContext';
import AvatarComponent from '../Avatar';
import { FaSearch, FaTag, FaUsers, FaComments } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './home.css';
import image1 from '../../assets/slider-consoles-ps5-slim-standard-et-digital-multi.jpeg';
import image2 from '../../assets/avatar-4k-collector-visuel-slider-v2-_1_.jpeg';
import image3 from '../../assets/SLIDER-gta-6-ps5-visuel-provisoire-v2.jpeg';

const fakeDiscussions = [
  { id: 1, title: "Meilleur deal PS5", author: "GamerPro", replies: 23, likes: 45 },
  { id: 2, title: "Promo sur les SSD", author: "TechGeek", replies: 17, likes: 32 },
  { id: 3, title: "Bon plan abonnement Netflix", author: "SeriesAddict", replies: 28, likes: 56 },
];

export default function Home() {
  const images = [image1, image2, image3]
  const { user } = useAuth()

  return (
    <div className="w-full min-h-screen p-10 animatedBackground flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-white text-center mb-6">
          Les meilleurs bons plans
        </h1>
    

      <Swiper
        effect={'cube'}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        navigation={true}
        modules={[EffectCube, Pagination, Navigation, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          reverseDirection: false,
        }}
        className="w-96 h-96 mt-12 mb-12"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index}`}
              className="object-cover w-full h-full"
            />
          </SwiperSlide>
        ))}
      </Swiper>      
      <p className="text-xl text-gray-200 text-center mb-10 max-w-2xl">
        Découvrez des offres exclusives, des réductions incroyables et des astuces pour économiser sur vos achats préférés.
      </p>

      <div className="flex justify-center mb-12">
        <AvatarComponent />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-2xl w-full">
        <FeatureCard 
          icon={<FaSearch className="text-2xl" />} 
          title="Trouvez" 
          description="Recherchez parmi des milliers de bons plans" 
        />
        <FeatureCard 
          icon={<FaTag className="text-xl" />} 
          title="Économisez" 
          description="Profitez de réductions exclusives" 
        />
        <FeatureCard 
          icon={<FaUsers className="text-2xl" />} 
          title="Partagez" 
          description="Échangez avec la communauté" 
        />
      </div>

      <div className="w-full max-w-4xl mt-16">
        <h2 className="text-3xl font-bold text-white text-center mb-8">Discussions récentes</h2>
        <div className="grid gap-6">
          {fakeDiscussions.map((discussion) => (
            <DiscussionCard key={discussion.id} discussion={discussion} />
          ))}
        </div>
      </div>

      
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-4 text-center">
      <div className="text-white mb-2 flex justify-center">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-300">{description}</p>
    </div>
  );
}

function DiscussionCard({ discussion }) {
  return (
    <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 transition-all duration-300 hover:bg-opacity-20 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-white">{discussion.title}</h3>
        <div className="flex items-center space-x-4">
          <span className="text-gray-300 flex items-center">
            <FaComments className="mr-2 text-sm" /> {discussion.replies}
          </span>
          <span className="text-gray-300 flex items-center">
            <FaTag className="mr-2 text-sm" /> {discussion.likes}
          </span>
        </div>
      </div>
      <p className="text-gray-400 mt-2">Par {discussion.author}</p>
    </div>
  );
}
