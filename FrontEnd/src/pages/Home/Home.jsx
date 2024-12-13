import { useState } from "react";
import { Link } from "react-router-dom";
import CardProjet from "../../components/CardProjet/CardProjet";
import Filter from "../../components/Filter/Filter";
import projets from "../../data/projets.json";
import "./Home.scss";

function Home() {
  const [tag, setchosenTag] = useState(null);

  const handleTagClick = (tag) => {
    setchosenTag(tag);
  };

  return (
    <main className="home">
      <section className="home__about">
        <h2> PROFIL </h2>
        <p>
          
          Ceci est une introduction visant à mettre en avant mon profil et à
          expliquer ma recherche d'emploi
        </p>
        <p>
          
          Vous pouvez retrouver mon parcours détaillé ainsi que mon CV en
          cliquant sur ce <Link to="/parcours"> lien </Link>
        </p>
      </section>
      <section className="home__projets">
        <h2> MES PROJETS </h2>
        <p>
          
          Cette partie présente les différents projets que j'ai réalisé ou sur
          lesquels je travaille actuellement.
        </p>
        <p>
          
          Le filtre ci-dessous permet de sélectionner les projets par mots-clés,
          le bouton Tous permet de réinitialiser ce filtre.
        </p>
        <div className="home__projets-filtre">
          <Filter onTagClick={handleTagClick} />
        </div>
        <div className="home__projets-container">
          {tag === null
            ? projets.map(({ id, title, cover, snippet }) => (
                <div key={id}>
                    <CardProjet id={id} title={title} cover={cover} snippet={snippet} />
                </div>
              ))
            : projets
                .filter((projet) => projet.tags.includes(tag))
                .map(({ id, title, cover, snippet }) => (
                  <div key={id}>
                      <CardProjet
                        title={title}
                        cover={cover}
                        snippet={snippet}
                        id={id}
                      />
                  </div>
                ))}
        </div>
      </section>
      <section className="home__contact">
        <h2> MES CONTACTS </h2>
        <p>
        
          Cette section vise à laisser mes informations pour pouvoir être
          contacté facilement
        </p>
      </section>
    </main>
  );
}

export default Home;
