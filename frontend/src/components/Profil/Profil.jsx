import { Link } from "react-router-dom";
import "./Profil.scss";


function Profil () {
    return (
        
        <div className="profil"> 
        <h2 className="profil__title"> Profil </h2>
        <p> A l'issue d'une formation de <strong> Développeur Web Fullstack </strong>, et disposant d'une formation juridique et économique, ainsi que d'un parcours professionnel varié, je recherche une première experience professionnelle dans le domaine, en <strong> alternance </strong> ou en <strong> plein emploi </strong>. </p> 
        <p> Dôté d'une curiosité intellectuelle importante et d'une forte autonomie, ainsi que d'un attrait pour les questions du back-end et de la sécurité informatique, je saurai m'adapter et être efficace rapidement. </p>
        <p>
          Vous pouvez retrouver mon parcours détaillé ainsi que mon CV en
          cliquant sur ce <Link to="/parcours"> lien </Link>
        </p>
        </div>
    )
}

export default Profil 