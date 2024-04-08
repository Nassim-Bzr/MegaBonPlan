import { Swiper, SwiperSlide } from "swiper/react";
// Importez Autoplay avec les autres modules
import { EffectCube, Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay"; // Assurez-vous d'importer le CSS pour autoplay
import "./home.css";
import image1 from "../../assets/slider-consoles-ps5-slim-standard-et-digital-multi.jpeg";
import image2 from "../../assets/avatar-4k-collector-visuel-slider-v2-_1_.jpeg";
import image3 from "../../assets/SLIDER-gta-6-ps5-visuel-provisoire-v2.jpeg";

export default function Home() {
  const images = [image1, image2, image3];

  return (
    <div className="w-full h-screen p-10 items-center animatedBackground">
      <h1 className="text-4xl font-semibold text-white text-center mb-10">
        Les meilleurs bons plans pour <br></br> faire des économies toute
        l’année
      </h1>
      <Swiper
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        navigation={true}
        modules={[EffectCube, Pagination, Navigation, Autoplay]} // Ajoutez Autoplay ici
        autoplay={{
          // Configurez l'option autoplay ici
          delay: 2500, // Temps en ms avant de passer à la slide suivante (5000 pour 5s, par exemple)
          disableOnInteraction: false, // Continue l'autoplay même après interaction de l'utilisateur
          reverseDirection: false, // Fait tourner le cube dans le sens inverse si mis à true
        }}
        className="w-96 h-96"
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
      <div
        className="absolute top-32 inset-0 blur-[118px] max-w-lg h-[220px] mx-auto sm:max-w-3xl sm:h-[200px]"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
        }}
      ></div>
    </div>
  );
}
