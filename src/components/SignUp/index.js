import React, { useState } from "react";
import "./signup.css";
import logoapple from "../../assets/logo-apple 2.png";
import logogoogle from "../../assets/google.png";
import Logofb from "../../assets/facebook (1).png";
import { Link } from "react-router-dom";
import { Checkbox } from "@material-ui/core";

export default function SignUp() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    // Ajoutez ici votre logique pour envoyer ces données à votre serveur
  };

  // Exemple de gestionnaire pour la connexion via un service tiers
  const handleSocialLogin = (service) => {
    console.log(`Connexion avec ${service}`);
    // Ici, vous implémenterez la logique spécifique à chaque service
  };

  return (
    <div className="div-globalsignup">
      <h2 className="title-signup">S'inscrire - Rejoindre la communauté</h2>
      <form className="formsignup" onSubmit={handleSubmit}>
        <div className="div-signup">
          <label className="labeluser">Pseudo </label>
          <input
            className="input-signupuser"
            placeholder="Votre nom d'utilisateur..."
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />

          <label className="labelemail">Email</label>
          <input
            className="input-signupemail"
            placeholder="sarahconnor@example.com"
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />

          <label className="labelpassword">Mot de passe</label>
          <input
            className="input-signuppassword"
            placeholder="**********"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />

          <p className="text-conditions">
            <Checkbox/>
            J'ai lu et j'accepte les Conditions Générales d'Utilisation ainsi
            que la Politique de confidentialité
          </p>
          <p className="text-newsletter">
            <Checkbox/>
            Je souhaite m'inscrire à la newsletter quotidienne !
          </p>
          
          <button className="button-signin" type="submit">
            S'inscrire
          </button>
          <Link className="link-alreadysignup" to="/connexion">
            <button className="button-alreadysignup" type="submit">   
              Déjà inscrit ? Cliquez ici pour vous connecter
            </button>
          </Link>
        </div>
        <div className="div-buttonlogin">
          <button
            className="button-fb"
            onClick={() => handleSocialLogin("Facebook")}
          >
            {" "}
            <img className="logofb" src={Logofb} /> S'enregistrer avec Facebook
          </button>
          <button
            className="button-google"
            onClick={() => handleSocialLogin("Google")}
          >
            {" "}
            <img className="logogoogle" src={logogoogle} /> S'enregistrer avec
            Google
          </button>
          <button
            className="button-apple"
            onClick={() => handleSocialLogin("Apple")}
          >
            {" "}
            <img className="logoapple" src={logoapple} /> S'enregistrer avec
            Apple
          </button>
        </div>
      </form>
    </div>
  );
}
