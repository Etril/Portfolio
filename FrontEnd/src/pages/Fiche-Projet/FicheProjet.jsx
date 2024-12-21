import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import "./FicheProjet.scss";
import Carrousel from "../../components/Carrousel/Carrousel";
import Tags from "../../components/Tags/Tags";
import Tools from "../../components/Tools/Tools";
import Description from "../../components/Description/Description";
import TitreProjet from "../../components/TitreProjet/TitreProjet";
import Loader from "../../components/Loader/Loader";

function FicheProjet() {
  const {choice} = useParams();
  const [projetChoisi, setProjetChoisi] = useState([]);
  const [loading, setLoading]=useState(true);
  const [found, setFound]=useState(true);

  const apiUrl = import.meta.env.VITE_API_URL;


  useEffect (() => { axios.get(`${apiUrl}/api/projets/${choice}`)
    .then((response) => {
      setProjetChoisi(response.data)
      console.log(projetChoisi);
      setLoading(false);
    })
  .catch(() => {
    setFound(false);
    setLoading(false);
  })
 }, [choice]);

 if (!found) {
  return <Navigate to="/erreur404" replace />;
 }


  return (
    loading ? (<Loader />) : ( 
    <main>
        <main className="fiche">
          <div className="fiche__carrousel">
            <Carrousel images={projetChoisi.pictures} />
          </div>
          <section className="fiche__details">
            <TitreProjet title= {projetChoisi.title} lien= {projetChoisi.lien} />
            <Tags tags={projetChoisi.tags} />
            <Tools tools={projetChoisi.tools} />
            <Description description = {projetChoisi.description} />
          </section>
        </main>
    </main>)
    
  );
}

export default FicheProjet;
