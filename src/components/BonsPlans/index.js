import React, { useState, useEffect } from "react";
import "./bonplans.css";
import { Carousel, IconButton } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function BonPlans() {
  const [bonPlans, setBonPlans] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/bonplans")
      .then((response) => response.json())
      .then((data) => {
        const filteredPlans = data.filter(bonPlan => bonPlan.ApprouveParAdmin); // Filtrer pour garder seulement les bons plans approuvés
        setBonPlans(filteredPlans);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des bons plans:", error);
      });
  }, []);

  console.log(bonPlans); // Vous pouvez retirer cette ligne après avoir confirmé que les données sont correctes

  return (
    <div className="py-8 px-4 animatedBackground">
      <h2 className="text-4xl font-bold text-center text-white mb-10">
        Découvrez les Bons Plans
      </h2>
      <div className="max-w-screen-xl mx-auto animatedBackground grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bonPlans.map((bonPlan, index) => (
          <div
            key={index}
            className="rounded-lg animatedBackground overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <a href={bonPlan.LienAffiliation} className="block">
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
