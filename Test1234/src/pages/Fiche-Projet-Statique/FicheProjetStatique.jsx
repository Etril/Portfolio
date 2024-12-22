import { useParams }from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./FicheProjetStatique.scss";
import Carrousel from "../../components/Carrousel/Carrousel";
import Tags from "../../components/Tags/Tags";
import Tools from "../../components/Tools/Tools";
import Description from "../../components/Description/Description";
import TitreProjet from "../../components/TitreProjet/TitreProjet";
import ModaleModificationStatique from "../../components/ModaleModificationStatique/ModaleModificationStatique";
import Modal from 'react-modal';
import Loader from "../../components/Loader/Loader";

function FicheProjetStatique() {
  const [isOpen, setIsOpen] = useState(false);
  const {choice} = useParams();
  const [projetChoisi, setProjetChoisi] = useState([]);
  const [loading, setLoading]=useState(true);
  const [found, setFound]=useState(true);

  
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect (() => { axios.get(`${apiUrl}/api/projets/${choice}`)
    .then((response) => {
      setProjetChoisi(response.data)
      setLoading(false);
    })
  .catch(() => {
    setFound(false);
    setLoading(false);
  })
 }, [choice]);
  
      useEffect(() => {
          if (isOpen) {
            
            document.body.style.overflow = 'hidden';
          } else {
            
            document.body.style.overflow = 'auto';
          }
          
          return () => {
            
            document.body.style.overflow = 'auto';
          };
        }, [isOpen]);
      
          const openModal= () => {
              setIsOpen(true);
          };
      
          const closeModal= () => {
              setIsOpen(false);
          };

          

  const handleDelete = () => {
    window.confirm("Ëtes vous sur de vouloir supprimer ce projet? Cette action est définitive")
  }

  if (!found) {
    return <Navigate to="/erreur404" replace />;
   }

  return (
    loading ? (<Loader />) : (
    <main>
      {projetChoisi ? (
        <main className="fiche">
          <div className="fiche__carrousel">
            <Carrousel images={projetChoisi.pictures} />
          </div>
          <div className="fiche__buttons">
            <button className="fiche__modify" onClick={openModal}> Modifier </button>
            <Modal isOpen={isOpen} onRequestClose={closeModal} contentLabel="Modale de modification" className="fiche__modale">
                <button className="fiche__close" onClick={closeModal}> X </button>
                <ModaleModificationStatique projetChoisi= {projetChoisi} />
            </Modal>
            <button className="fiche__delete" onClick={handleDelete}> Supprimer </button>
          </div>
          <section className="fiche__details">
            <TitreProjet title= {projetChoisi.title} lien= {projetChoisi.lien} />
            <Tags tags={projetChoisi.tags} />
            <Tools tools={projetChoisi.tools} />
            <Description description = {projetChoisi.description} />
          </section>
        </main>
      ) : (
        <Navigate to="/erreur404" replace />
      )}
    </main>)
  );
}

export default FicheProjetStatique;
