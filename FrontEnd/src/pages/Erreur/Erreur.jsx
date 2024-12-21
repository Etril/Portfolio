import "./Erreur.scss";
import { Link } from "react-router-dom";

function Erreur() {
    return (
        <main className="erreur"> 
            <article> 
                <h1 className="erreur__number"> 404 </h1>
                <h2 className="erreur__text"> La page que vous demandez n'existe pas. </h2>
            <Link to="/" className="erreur__lien"> Retourner sur la page d'accueil </Link>
            </article>
        </main>
    )
}

export default Erreur;