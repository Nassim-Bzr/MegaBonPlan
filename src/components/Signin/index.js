import React from "react";
import "./signin.css"; // Assurez-vous d'importer le fichier CSS correctement
import cadena from "../../assets/fermer-a-cle.png";
import logoapple from "../../assets/logo-apple 2.png";
import logogoogle from "../../assets/google.png";
import Logofb from "../../assets/facebook.png";

export default function Login() {
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
            type="password"
            placeholder="*********"
          />
          <img className="cadena-login" src={cadena} alt="Cadena" />
        </div>
        <button className="button-login" type="submit">
          Se connecter
        </button>
        <div className="btn-grouplogine>">        
        <button className="button-apple">
          
          <img className="logoapple" src={logoapple} /> S'enregistrer avec Apple
        </button>
        <button className="button-fb">
        
          <img className="logofb" src={Logofb} /> S'enregistrer avec Facebook
        </button>
        <button className="button-google">
          
          <img className="logogoogle" src={logogoogle} /> S'enregistrer avec
          Google
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
