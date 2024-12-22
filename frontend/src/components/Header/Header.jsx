import { Link } from "react-router-dom";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../Header/Header.scss";

function Header() {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

  const getCookie = (x) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + x + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  useEffect(() => {
    const token = getCookie('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    document.cookie='token=; path=/; expires= Thu, 01 Jan 1970 00:00:00 UTC';
    setIsAuthenticated(false);
    navigate ('/login');
  }



  return (
    <header>
      <h1> AG Dev </h1>
      <nav>
        {isAuthenticated ? <Link to="/dashboard"> Dashboard </Link> : <Link to="/"> Accueil </Link>  }
        <Link to="/parcours"> Parcours </Link>
        {isAuthenticated ? <button onClick={handleLogout}> Deconnexion </button> :
        <Link to="/login"> Connexion </Link>}
      </nav>
    </header>
  );
}

export default Header;
