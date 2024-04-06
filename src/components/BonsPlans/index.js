import React, { useState, useEffect } from "react";
import "./bonplans.css";

import { Link } from "react-router-dom";
import Alert from "../Alert/index"; // Import the 'Alert' component from the appropriate package

export default function BonPlans() {
  const [bonPlans, setBonPlans] = useState([]);
  const [selectedBonPlan, setSelectedBonPlan] = useState(null);
  const posts = [
    {
      title: "What is SaaS? Software as a Service Explained",
      desc: "Going into this journey, I had a standard therapy regimen, based on looking at the research literature. After I saw the movie, I started to ask other people what they did for their anxiety, and some",
      img: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      authorLogo: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
      authorName: "Sidi dev",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "A Quick Guide to WordPress Hosting",
      desc: "According to him, â€œI'm still surprised that this has happened. But we are surprised because we are so surprised.â€More revelations about Whittington will be featured in the film",
      img: "https://images.unsplash.com/photo-1620287341056-49a2f1ab2fdc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      authorLogo: "https://api.uifaces.co/our-content/donated/FJkauyEa.jpg",
      authorName: "Micheal",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "7 Promising VS Code Extensions Introduced in 2022",
      desc: "I hope I remembered all the stuff that they needed to know. They're like, 'okay,' and write it in their little reading notebooks. I realized today that I have all this stuff that",
      img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      authorLogo: "https://randomuser.me/api/portraits/men/46.jpg",
      authorName: "Luis",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
    {
      title: "How to Use Root C++ Interpreter Shell to Write C++ Programs",
      desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational microlensing was used to observe the",
      img: "https://images.unsplash.com/photo-1617529497471-9218633199c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
      authorLogo: "https://api.uifaces.co/our-content/donated/KtCFjlD4.jpg",
      authorName: "Lourin",
      date: "Jan 4 2022",
      href: "javascript:void(0)",
    },
  ];

  useEffect(() => {
    fetch("http://localhost:8080/api/bonplans")
      .then((response) => response.json())
      .then((data) => setBonPlans(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des bons plans:", error)
      );
  }, []);
  console.log(bonPlans);
  const handleAddToFavorites = (bonPlan) => {
    setSelectedBonPlan(bonPlan);
    setTimeout(() => {
      setSelectedBonPlan(null);
    }, 2500); // Delay removal of selectedBonPlan state for 2 seconds
  };

  return (
    <div className=" py-8 px-4 animatedBackground">
      <h2 className="text-4xl font-bold text-center text-white mb-10">
        Découvrez les Bons Plans
      </h2>

      <div className="max-w-screen-xl mx-auto animatedBackground grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bonPlans.map((bonPlan, index) => (
          <div
            key={index}
            className=" rounded-lg animatedBackground overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <a href={bonPlan.LienAffiliation} className="block">
              {/* Image non fournie dans les données de l'API, ajoutez votre logique ici si nécessaire */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white">
                  {bonPlan.Titre}
                </h3>
                <p className="text-gray-500 mt-2">{bonPlan.Description}</p>
                <p className="text-gray-400 text-sm mt-2">
                  Posté le: {bonPlan.DatePost}
                </p>
              </div>
            </a>
          </div>
        ))}
      </div>
      <div
        className="absolute top-32 inset-0 bottom-32 blur-[118px] max-w-lg h-[800px] mx-auto sm:max-w-3xl sm:h-[400px]"
        style={{
          background:
            "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
        }}
      ></div>
    </div>
  );
}
