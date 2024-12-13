import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./FicheProjet.scss";
import projets from "../../data/projets.json";
import Carrousel from "../../components/Carrousel/Carrousel";
import Tags from "../../components/Tags/Tags";
import Tools from "../../components/Tools/Tools";
import Description from "../../components/Description/Description";
import TitreProjet from "../../components/TitreProjet/TitreProjet";

function FicheProjet() {
  const { choice } = useParams();
  const projetChoisi = projets.find((projets) => projets.id === choice);

  return (
    <div>
      {projetChoisi ? (
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
      ) : (
        <Navigate to="/erreur404" replace />
      )}
    </div>
  );
}

export default FicheProjet;
