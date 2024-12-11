import { Link } from "react-router-dom";
import "../Header/Header.scss";

function Header () {
    return (
    <header> 
        <h1> AG Développeur Web Fullstack </h1>
        <nav> 
            <Link to= "/"> Accueil </Link>
            <Link to="/parcours"> Parcours </Link>
            <Link to="/login"> Connexion </Link>
        </nav>

    </header>
    )
}

export default Header