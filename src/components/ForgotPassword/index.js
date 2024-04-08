import React from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="bg-gray-900">
      <main className="w-full p-24 flex flex-col items-center justify-center px-4 relative ">
        <div className="max-w-sm w-full text-white-600 space-y-8 ">
          <div className="text-center ">
            <div className=" space-y-2">
              <h3 className="text-white text-2xl font-semibold sm:text-4xl">
                Réinitialiser votre mot de passe
              </h3>
              <p className="text-gray-600">
                Retour à la{" "}
                <Link
                  to="/connexion"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Connexion
                </Link>
              </p>
            </div>
          </div>
          <form
            className="bg-white shadow p-4 py-6 sm:p-6 sm:rounded-lg"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="text-gray-600 font-medium">Email</label>
              <input
                type="email"
                required
                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                placeholder="Votre adresse email"
              />
            </div>
            <button className="w-full mt-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150">
              Réinitialiser le mot de passe
            </button>
            <div className="text-center mt-4">
              <Link
                to="/connexion"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Se souvenir du mot de passe ? Connexion
              </Link>
            </div>
          </form>
        </div>
        <div
          className="absolute top-16 inset-0 blur-[118px] max-w-lg h-[220px] mx-auto sm:max-w-3xl sm:h-[200px]"
          style={{
            background:
              "linear-gradient(106.89deg, rgba(192, 132, 252, 0.11) 15.73%, rgba(14, 165, 233, 0.41) 15.74%, rgba(232, 121, 249, 0.26) 56.49%, rgba(79, 70, 229, 0.4) 115.91%)",
          }}
        ></div>
      </main>
    </div>
  );
}
