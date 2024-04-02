import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/Api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) =>
        console.error("Erreur lors de la récupération des catégories:", error)
      );
  }, []);
  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-semibold text-gray-800 text-center mb-10">
        Découvrez nos Catégories
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group relative rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
            style={{ height: "300px" }}
          >
            <img
              src={category.imglink}
              alt={category.nomcategorie}
              className="absolute inset-0 w-full h-full object-cover filter group-hover:brightness-75 transition duration-300"
            />
            <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black via-transparent to-transparent">
              <h3 className="text-xl text-white font-semibold mb-4">
                {category.nomcategorie}
              </h3>
              <Link
                href="#"
                className=" px-4 py-2 rounded-md border border-transparent text-white font-semibold hover:border-white hover:bg-white/10 transition-all duration-300 ease-in-out"
                style={{ backdropFilter: "blur(5px)" }}
              >
                Explorer
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
