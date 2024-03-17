
import "./signup.css";
import logoapple from "../../assets/logo-apple 2.png";
import logogoogle from "../../assets/google.png";
import Logofb from "../../assets/facebook (1).png";
import { Link } from "react-router-dom";


export default function SignUp() {


  return (
    <div className="div-globalsignup">
      <form className="formsignup" >
        <div className="div-signup">
          <h2 className="title-signup">Rejoindre la communauté</h2>
          <label className="labeluser">Pseudo </label>
          <input
            className="input-signupuser"
            placeholder="Votre nom d'utilisateur..."
            type="text"
            name="username"


          />

          <label className="labelemail">Email</label>
          <input
            className="input-signupemail"
            placeholder="sarahconnor@example.com"
            type="email"
            name="email"

          />

          <label className="labelpassword">Mot de passe</label>
          <input
            className="input-signuppassword"
            placeholder="**********"
            type="password"
            name="password"

          />

          <p className="text-conditions">

            J'ai lu et j'accepte les Conditions Générales d'Utilisation ainsi
            que la Politique de confidentialité
          </p>
          <p className="text-newsletter">

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

          >
            {" "}
            <img className="logofb" src={Logofb} alt="" /> S'enregistrer avec
            Facebook
          </button>
          <button
            className="button-google"

          >
            {" "}
            <img className="logogoogle" src={logogoogle} alt="" /> S'enregistrer
            avec Google
          </button>
          <button
            className="button-apple"

          >

            <img className="logoapple" src={logoapple} alt="" /> S'enregistrer
            avec Apple
          </button>
        </div>
      </form>
    </div>
  );
}
