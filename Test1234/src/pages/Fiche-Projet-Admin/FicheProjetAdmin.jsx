import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "./FicheProjetAdmin.scss";
import Carrousel from "../../components/Carrousel/Carrousel";
import Tags from "../../components/Tags/Tags";
import Tools from "../../components/Tools/Tools";
import Description from "../../components/Description/Description";
import TitreProjet from "../../components/TitreProjet/TitreProjet";
import ModaleModification from "../../components/ModaleModification/ModaleModification";
import Modal from "react-modal";
import Loader from "../../components/Loader/Loader";

function FicheProjetAdmin() {
  const { choice } = useParams();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [projetChoisi, setProjetChoisi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [found, setFound] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const getCookie = (x) => {
    const match = document.cookie.match(new RegExp("(^| )" + x + "=([^;]+)"));
    return match ? match[2] : null;
  };

  const navigate= useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/projets/${choice}`)
      .then((response) => {
        setProjetChoisi(response.data);
        setLoading(false);
      })
      .catch(() => {
        setFound(false);
        setLoading(false);
      });
  }, [choice]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const getProjet= () => {axios.get(`${apiUrl}/api/projets/${choice}`)
    .then((response) => {
      setProjetChoisi(response.data)
    })}

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  

  const handleDelete = () => {
    const isConfirmed= window.confirm("Ëtes vous sur de vouloir supprimer ce projet? Cette action est définitive");
    if (isConfirmed) {
    const token = getCookie('token');
    axios.delete (`${apiUrl}/api/projets/${projetChoisi._id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      }
    )
    .then ((response) => {
      console.log(response.data);
      navigate ("/dashboard")
    })
    .catch((error) => {
      console.log(error)
    })
  }
}

  if (!found) {
    return <Navigate to="/erreur404" replace />;
  }
  return isAuthenticated ? (
    loading ? (<Loader />) : (
    <main>
      {projetChoisi ? (
        <main className="fiche">
          <div className="fiche__carrousel">
            <Carrousel images={projetChoisi.pictures} />
          </div>
          <div className="fiche__buttons">
            <button className="fiche__modify" onClick={openModal}>
              
              Modifier
            </button>
            <Modal
              isOpen={isOpen}
              onRequestClose={closeModal}
              contentLabel="Modale de modification"
              className="fiche__modale"
            >
              <button className="fiche__close" onClick={closeModal}>
               
                X
              </button>
              <ModaleModification projetChoisi={projetChoisi} onUpdate= {getProjet} />
            </Modal>
            <button className="fiche__delete" onClick={handleDelete}> Supprimer </button>
          </div>
          <section className="fiche__details">
            <TitreProjet title={projetChoisi.title} lien={projetChoisi.lien} />
            <Tags tags={projetChoisi.tags} />
            <Tools tools={projetChoisi.tools} />
            <Description description={projetChoisi.description} />
          </section>
        </main>
      ) : (
        <Navigate to="/erreur404" replace />
      )}
    </main>
  )) : (
    <Navigate to="/login" replace />
  );
}

export default FicheProjetAdmin;
