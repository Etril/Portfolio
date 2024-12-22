import { Link } from "react-router-dom";
import "./Login.scss";

import "./Login.scss";
import LoginForm from "../../components/LoginForm/LoginForm";

function Login() {
  return (
    <main className="login">
      <section className="login__section">
        <h2 className="login__title"> Connexion </h2>
        
        <LoginForm />
      </section>
      <p> Cette page de connexion m'est réservée, afin d'accéder à la partie d'administration du site.
          Celle-ci me permet d'ajouter, modifier et supprimer des projets sans avoir à changer le code, comme le ferait l'utilisateur principal
          d'un site portfolio. Vous pouvez trouver une version statique de cette section du site <Link to="/statique"> ici</Link>.  
        </p>
    </main>
  );
}

export default Login;
