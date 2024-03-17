import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../../firebase/firebase-config"; // Assurez-vous que le chemin est correct et sans faute de frappe

import "./signin.css";
import cadena from "../../assets/fermer-a-cle.png";
import logoapple from "../../assets/logo-apple 2.png";
import logogoogle from "../../assets/google.png";
import Logofb from "../../assets/facebook.png";

export default function Login() {
  const auth = getAuth(app);

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // Cela donne un objet Google AccessToken. Vous pouvez utiliser cet objet pour accéder aux API Google.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // Les informations de l'utilisateur connecté
        const user = result.user;
        // Vous pouvez faire quelque chose avec le token et l'utilisateur ici
        console.log(user);
      })
      .catch((error) => {
        // Gérer les erreurs ici
        const errorCode = error.code;
        const errorMessage = error.message;
        // L'email de l'utilisateur, si disponible
        const email = error.email;
        // Le type d'authentification Firebase qui était utilisé
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error(
          "Erreur de connexion avec Google:",
          errorCode,
          errorMessage
        );
      });
  };

  return (
    <div className="login-container">
      <h2 className="title-login">Connexion</h2>
      <form className="form-login">
        <input
          className="input-email"
          type="text"
          placeholder="Nom d'utilisateur"
        />
        <div className="input-password-container">
          <input
            className="input-password"
            type="text"
            placeholder="*********"
          />
          <img className="cadena-login" src={cadena} alt="Cadena" />
        </div>
        <button className="button-login" type="submit">
          Se connecter
        </button>
        <div className="btn-grouplogine>">
          <button className="button-applelogin">
            <img className="logoapple" src={logoapple} alt="Apple Logo" />{" "}
            S'enregistrer avec Apple
          </button>
          <button className="button-fblogin">
            <img className="logofb" src={Logofb} alt="Facebook Logo" />{" "}
            S'enregistrer avec Facebook
          </button>
          <button className="button-googlelogin" onClick={handleGoogleSignIn}>
            <img className="logogoogle" src={logogoogle} alt="Google Logo" />{" "}
            S'enregistrer avec Google
          </button>
        </div>
        <div className="button-others">
          <button className="button-inscription" type="submit">
            Inscription
          </button>
          <button className="button-forgot" type="submit">
            Mot de passe oublié ?{" "}
          </button>
        </div>
      </form>
    </div>
  );
}
